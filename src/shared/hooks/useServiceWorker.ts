import { useEffect } from 'react';

import { logger } from '@/shared/lib/logger';

const initServiceWorker = () => {
	if ('serviceWorker' in navigator && import.meta.env.PROD) {
		window.addEventListener('load', () => {
			navigator.serviceWorker
				.register('/sw.js', { scope: '/' })
				.then((registration) => {
					logger.log('[PWA] Service Worker registered:', registration);

					const updateIntervalId = setInterval(
						() => {
							registration.update();
						},
						5 * 60 * 1000,
					);

					window.addEventListener('beforeunload', () => {
						clearInterval(updateIntervalId);
					});

					registration.addEventListener('updatefound', () => {
						const newWorker = registration.installing;

						if (newWorker) {
							newWorker.addEventListener('statechange', () => {
								if (
									newWorker.state === 'installed' &&
									navigator.serviceWorker.controller
								) {
									logger.log('[PWA] New Service Worker update available');

									window.dispatchEvent(
										new CustomEvent('pwa-update-available', {
											detail: { registration },
										}),
									);
								}
							});
						}
					});

					navigator.serviceWorker.addEventListener('message', (event) => {
						if (event.data.type === 'PWA_INSTALLED') {
							localStorage.setItem('pwa-installed', 'true');
							logger.log('[PWA] PWA installation marker set');
							window.dispatchEvent(new CustomEvent('pwa-installed'));
						}
					});
				})
				.catch((error) => {
					logger.warn('[PWA] Service Worker registration failed:', error);
				});
		});
	}
};

const usePwaUpdateListener = (callback?: () => void) => {
	useEffect(() => {
		if (typeof window === 'undefined') return;

		const handler = () => {
			logger.log('[PWA] Update available');
			if (callback) callback();
		};

		window.addEventListener('pwa-update-available', handler);
		return () => window.removeEventListener('pwa-update-available', handler);
	}, [callback]);
};

const skipWaitingAndReload = () => {
	if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
		navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
		window.location.reload();
	}
};

export { initServiceWorker, skipWaitingAndReload, usePwaUpdateListener };
