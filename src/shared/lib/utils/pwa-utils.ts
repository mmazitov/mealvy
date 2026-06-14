import { logger } from '@/shared/lib/logger';

const clearAllCaches = async (): Promise<void> => {
	if (!('caches' in window)) {
		logger.warn('[PWA] Caches API not available');
		return;
	}

	const cacheNames = await caches.keys();
	logger.log('[PWA] Found caches:', cacheNames);

	await Promise.all(
		cacheNames
			.filter((name) => name.startsWith('mealvy-'))
			.map((name) => {
				logger.log(`[PWA] Clearing cache: ${name}`);
				return caches.delete(name);
			}),
	);

	logger.log('[PWA] All caches cleared');
};

const unregisterAllServiceWorkers = async (): Promise<void> => {
	if (!('serviceWorker' in navigator)) {
		logger.warn('[PWA] Service Worker API not available');
		return;
	}

	const registrations = await navigator.serviceWorker.getRegistrations();
	logger.log('[PWA] Found service workers:', registrations.length);

	await Promise.all(
		registrations.map((registration) => {
			logger.log('[PWA] Unregistering service worker:', registration.scope);
			return registration.unregister();
		}),
	);

	logger.log('[PWA] All service workers unregistered');
};

const fullPwaReset = async (): Promise<void> => {
	logger.log('[PWA] Starting full PWA reset...');

	try {
		await clearAllCaches();
		await unregisterAllServiceWorkers();

		localStorage.removeItem('pwa-installed');

		logger.log('[PWA] Full reset complete. Reload the page to reinstall PWA');

		setTimeout(() => {
			window.location.reload();
		}, 1000);
	} catch (error) {
		logger.error('[PWA] Reset failed:', error);
	}
};

const getPwaCacheInfo = async (): Promise<{
	cacheCount: number;
	cacheNames: string[];
	totalSize: number;
}> => {
	if (!('caches' in window)) {
		return { cacheCount: 0, cacheNames: [], totalSize: 0 };
	}

	const cacheNames = await caches.keys();
	const mealvynCaches = cacheNames.filter((name) => name.startsWith('mealvy-'));

	let totalSize = 0;

	for (const cacheName of mealvynCaches) {
		const cache = await caches.open(cacheName);
		const keys = await cache.keys();

		for (const request of keys) {
			try {
				const response = await cache.match(request);
				if (response) {
					const blob = await response.blob();
					totalSize += blob.size;
				}
			} catch (error) {
				logger.warn('[PWA] Could not get size of cached item:', error);
			}
		}
	}

	return {
		cacheCount: mealvynCaches.length,
		cacheNames: mealvynCaches,
		totalSize,
	};
};

const formatBytes = (bytes: number, decimals = 2): string => {
	if (bytes === 0) return '0 Bytes';

	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ['Bytes', 'KB', 'MB', 'GB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export {
	clearAllCaches,
	formatBytes,
	fullPwaReset,
	getPwaCacheInfo,
	unregisterAllServiceWorkers,
};
