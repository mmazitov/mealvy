async function cacheFirst(request, cacheName) {
	const cache = await caches.open(cacheName);
	const cached = await cache.match(request);

	if (cached) {
		return cached;
	}

	try {
		const response = await fetch(request);
		if (response && response.status === 200) {
			cache.put(request, response.clone());
			if (cacheName === CACHES.IMAGES) {
				trimCache(cacheName, MAX_IMAGE_CACHE_ENTRIES).catch((err) =>
					error('[Strategy] Failed to trim image cache:', err),
				);
			}
		}
		return response;
	} catch (err) {
		error('[Strategy] Cache First failed, trying any cache:', err);
		const cacheMatch = await caches.match(request);
		if (cacheMatch) {
			return cacheMatch;
		}
		if (request.mode === 'navigate') {
			const offlineCache = await caches.match('/index.html');
			if (offlineCache) return offlineCache;
		}
		throw error;
	}
}

async function staleWhileRevalidate(request, cacheName) {
	const cache = await caches.open(cacheName);

	if (request.method === 'POST') {
		try {
			const response = await fetch(request);
			return response;
		} catch (err) {
			error('[Strategy] POST request failed:', err);
			throw err;
		}
	}

	const cached = await cache.match(request);

	const networkFetch = fetch(request.clone())
		.then((response) => {
			if (response && response.status === 200) {
				cache.put(request, response.clone());
			}
			return response;
		})
		.catch((err) => {
			error('[Strategy] Network fetch failed:', err);
			return null;
		});

	return cached || networkFetch;
}

async function networkFirst(request, cacheName) {
	const cache = await caches.open(cacheName);

	try {
		const response = await fetch(request);
		if (response && response.status === 200 && request.method === 'GET') {
			cache.put(request, response.clone());
		}
		return response;
	} catch (err) {
		error('[Strategy] Network First fallback to cache:', err);
		if (request.method === 'GET') {
			const cached = await cache.match(request);
			if (cached) {
				return cached;
			}
		}
		throw err;
	}
}

async function networkOnly(request) {
	try {
		return await fetch(request);
	} catch (err) {
		error('[Strategy] Network Only failed:', err);
		// Re-throw to let Apollo Client handle auth errors properly
		throw err;
	}
}
