async function cleanupOldCaches(allowedCaches) {
	const keys = await caches.keys();

	await Promise.all(
		keys.map((key) => {
			if (!allowedCaches.includes(key)) {
				log(`[SW Utils] Deleting old cache: ${key}`);
				return caches.delete(key);
			}
		}),
	);
}

// Cache API has no eviction policy — keys() preserves insertion order,
// so dropping from the front removes the oldest entries
async function trimCache(cacheName, maxEntries) {
	const cache = await caches.open(cacheName);
	const keys = await cache.keys();
	if (keys.length <= maxEntries) return;
	await Promise.all(
		keys.slice(0, keys.length - maxEntries).map((key) => cache.delete(key)),
	);
}

// Per-user data caches: dropped on logout or whenever the server reports the
// session is gone. App shell/static caches persist for fast reloads.
const DATA_CACHES = [
	CACHES.DISHES,
	CACHES.PRODUCTS,
	CACHES.PLANS,
	CACHES.IMAGES,
];

async function clearDataCaches() {
	await Promise.all(DATA_CACHES.map((key) => caches.delete(key)));
}

function isGraphQLRequest(request) {
	return request.url.includes('/graphql');
}

// Parse GraphQL operation from POST body
async function getGraphQLOperation(request) {
	try {
		if (request.method === 'POST' && request.clone) {
			const clonedRequest = request.clone();
			const body = await clonedRequest.json();
			return {
				operationName: body.operationName,
				query: body.query,
			};
		}
	} catch (err) {
		error('[SW Utils] Failed to parse GraphQL operation:', err);
	}
	return null;
}

function isAuthRequest(request) {
	return request.url.includes('/auth/');
}

function isSupportedScheme(url) {
	return url.startsWith('http://') || url.startsWith('https://');
}

function isDevServerRequest(url) {
	return url.includes('@vite') || url.includes('@react-refresh');
}

function shouldCacheAsset(url) {
	const assetPatterns = [
		/\.js$/,
		/\.css$/,
		/\.woff2?$/,
		/\.ttf$/,
		/\.eot$/,
		/\.svg$/,
		/\.png$/,
		/\.jpg$/,
		/\.jpeg$/,
		/\.gif$/,
		/\.webp$/,
	];
	return assetPatterns.some((pattern) => pattern.test(url));
}
