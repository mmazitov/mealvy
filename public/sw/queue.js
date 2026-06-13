// Queued mutations expire: auth cookies are short-lived, so replaying a
// day-old request can't succeed anyway — without these caps the queue
// grows in Cache Storage forever
const QUEUE_MAX_SIZE = 50;
const QUEUE_TTL_MS = 24 * 60 * 60 * 1000;

async function enqueueRequest(request) {
	const cache = await caches.open(CACHES.QUEUE);

	try {
		// Keys start with Date.now(), so name order == insertion order
		const keys = await cache.keys();
		if (keys.length >= QUEUE_MAX_SIZE) {
			const oldest = keys.sort((a, b) => (a.url < b.url ? -1 : 1))[0];
			await cache.delete(oldest);
			log('[Queue] Queue full, dropped oldest entry');
		}

		const body = await request.clone().text();

		const entry = new Response(
			JSON.stringify({
				url: request.url,
				method: request.method,
				body: body,
				headers: [...request.headers.entries()],
				timestamp: Date.now(),
			}),
		);

		await cache.put(`${Date.now()}-${Math.random()}`, entry);
		log('[Queue] Request enqueued:', request.url);

		// Notify clients about offline action
		self.clients.matchAll().then((clients) => {
			clients.forEach((client) => {
				client.postMessage({
					type: 'OFFLINE_ACTION_QUEUED',
					url: request.url,
				});
			});
		});
	} catch (err) {
		error('[Queue] Failed to enqueue request:', err);
	}
}

async function replayQueue() {
	const cache = await caches.open(CACHES.QUEUE);
	const keys = await cache.keys();

	log(`[Queue] Replaying ${keys.length} queued requests`);

	for (const key of keys) {
		try {
			const entry = await cache.match(key);
			const data = await entry.json();

			if (Date.now() - data.timestamp > QUEUE_TTL_MS) {
				await cache.delete(key);
				log('[Queue] Dropped expired entry:', data.url);
				continue;
			}

			const response = await fetch(data.url, {
				method: data.method,
				headers: Object.fromEntries(data.headers),
				body: data.body,
			});

			if (response.ok) {
				await cache.delete(key);
				log('[Queue] Successfully replayed:', data.url);

				// Notify clients about successful replay
				self.clients.matchAll().then((clients) => {
					clients.forEach((client) => {
						client.postMessage({
							type: 'OFFLINE_ACTION_SYNCED',
							url: data.url,
						});
					});
				});
			} else if (response.status >= 400 && response.status < 500) {
				// Client errors (expired auth, bad input) won't succeed on retry
				await cache.delete(key);
				log('[Queue] Dropped unreplayable entry:', data.url, response.status);
			}
		} catch (err) {
			error('[Queue] Failed to replay request:', err);
			// Network failure — leave in queue for next sync attempt
		}
	}
}

async function getQueueSize() {
	const cache = await caches.open(CACHES.QUEUE);
	const keys = await cache.keys();
	return keys.length;
}
