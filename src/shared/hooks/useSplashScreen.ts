import { useEffect, useState } from 'react';

const getIsPWA = () => {
	const isStandalone =
		window.matchMedia('(display-mode: standalone)').matches ||
		(window.navigator as unknown as { standalone?: boolean }).standalone ===
			true;

	const isPWAInstalled = localStorage.getItem('pwa-installed') === 'true';

	return isStandalone || isPWAInstalled;
};

export const useSplashScreen = () => {
	const [isPWA, setIsPWA] = useState(getIsPWA);
	const [showSplash, setShowSplash] = useState(isPWA);

	useEffect(() => {
		const mediaQuery = window.matchMedia('(display-mode: standalone)');
		const listener = (e: MediaQueryListEvent) => {
			setIsPWA(e.matches);
			if (e.matches) {
				setShowSplash(true);
			}
		};
		mediaQuery.addEventListener('change', listener);

		return () => mediaQuery.removeEventListener('change', listener);
	}, []);
	return { showSplash, isPWA, setShowSplash };
};
