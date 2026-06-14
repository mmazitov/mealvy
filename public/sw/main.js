self.addEventListener('install', (event) => {
	log('[Service Worker] Installing...');

	event.waitUntil(
		caches.open(CACHES.APP_SHELL).then((cache) => {
			log('[Service Worker] Caching App Shell');
			const precacheUrls = self.__PRECACHE_MANIFEST || ['/', '/index.html'];
			log('[Service Worker] Precaching:', precacheUrls);
			return cache.addAll(precacheUrls);
		}),
	);

	self.skipWaiting();
});

self.addEventListener('activate', (event) => {
	log('[Service Worker] Activating...');

	event.waitUntil(cleanupOldCaches(Object.values(CACHES)));

	self.clients.claim();
});

self.addEventListener('fetch', (event) => {
	const { request } = event;
	const url = new URL(request.url);

	if (!isSupportedScheme(url.href) || isDevServerRequest(url.href)) {
		return;
	}

	if (request.method === 'POST' && isGraphQLRequest(request)) {
		event.respondWith(
			(async () => {
				const operation = await getGraphQLOperation(request);

				if (
					operation?.operationName === 'Me' ||
					operation?.operationName === 'Logout' ||
					operation?.query?.includes('query Me') ||
					operation?.query?.includes('mutation Logout')
				) {
					return networkOnly(request);
				}

				if (
					operation?.operationName === 'Products' ||
					operation?.query?.includes('query Products')
				) {
					return staleWhileRevalidate(request, CACHES.PRODUCTS);
				}

				if (
					operation?.operationName === 'Product' ||
					operation?.query?.includes('query Product')
				) {
					return staleWhileRevalidate(request, CACHES.PRODUCTS);
				}

				if (
					operation?.operationName?.includes('Dish') ||
					operation?.query?.includes('dishes')
				) {
					return staleWhileRevalidate(request, CACHES.DISHES);
				}

				if (operation?.query?.includes('mutation')) {
					try {
						const response = await fetch(request);
						return response;
					} catch (error) {
						await enqueueRequest(request);
						return new Response(
							JSON.stringify({
								offline: true,
								message: 'Mutation queued for sync',
							}),
							{
								status: 202,
								headers: { 'Content-Type': 'application/json' },
							},
						);
					}
				}

				return networkFirst(request, CACHES.PLANS);
			})(),
		);
		return;
	}

	if (request.method === 'GET') {
		if (request.mode === 'navigate') {
			event.respondWith(cacheFirst(request, CACHES.APP_SHELL));
			return;
		}

		if (shouldCacheAsset(url.href)) {
			event.respondWith(cacheFirst(request, CACHES.STATIC));
			return;
		}

		if (isAuthRequest(request)) {
			event.respondWith(networkOnly(request));
			return;
		}

		if (url.href.match(/\.(png|jpg|jpeg|gif|webp|svg)$/)) {
			event.respondWith(cacheFirst(request, CACHES.IMAGES));
			return;
		}
	}
});

self.addEventListener('sync', (event) => {
	if (event.tag === 'mealvy-sync') {
		log('[Service Worker] Background sync triggered');
		event.waitUntil(replayQueue());
	}
});

self.addEventListener('message', (event) => {
	// Only accept messages from trusted window clients (not SharedWorker or ServiceWorker)
	if (!event.source || !(event.source instanceof WindowClient)) {
		return;
	}

	if (event.data?.type === 'SKIP_WAITING') {
		self.skipWaiting();
	}

	if (event.data?.type === 'CLEAR_CACHE') {
		event.waitUntil(
			caches.keys().then((keys) => {
				return Promise.all(keys.map((key) => caches.delete(key)));
			}),
		);
	}

	// Drop per-user data caches on logout; app shell/static stay for fast reload
	if (event.data?.type === 'CLEAR_DATA_CACHE') {
		const dataCaches = [
			CACHES.DISHES,
			CACHES.PRODUCTS,
			CACHES.PLANS,
			CACHES.IMAGES,
		];
		event.waitUntil(Promise.all(dataCaches.map((key) => caches.delete(key))));
	}
});

self.addEventListener('push', (event) => {
	const data = event.data?.json() ?? {};

	const options = {
		body: data.body || 'New notification from Mealvy',
		icon: '/icon-192x192.png',
		badge: '/icon-192x192.png',
		data: data,
	};

	event.waitUntil(
		self.registration.showNotification(data.title || 'Mealvy', options),
	);
});
