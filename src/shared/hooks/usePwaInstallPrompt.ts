import { useEffect, useState } from 'react';

import { logger } from '@/shared/lib/logger';

interface BeforeInstallPromptEvent extends Event {
	prompt: () => Promise<void>;
	userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

declare global {
	interface WindowEventMap {
		beforeinstallprompt: BeforeInstallPromptEvent;
	}
}

const PWA_INSTALLED_MARKER = 'pwa-install-prompt';

const isMobileDevice = () => {
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
		navigator.userAgent,
	);
};

export const usePwaInstallPrompt = () => {
	const [canInstall, setCanInstall] = useState(false);
	const [deferredPrompt, setDeferredPrompt] =
		useState<BeforeInstallPromptEvent | null>(null);
	const [showPrompt, setShowPrompt] = useState(
		() => localStorage.getItem(PWA_INSTALLED_MARKER) !== 'true',
	);

	useEffect(() => {
		const handleBeforeInstall = (e: BeforeInstallPromptEvent) => {
			if (localStorage.getItem(PWA_INSTALLED_MARKER) === 'true') {
				return;
			}

			e.preventDefault();
			setDeferredPrompt(e);
			setCanInstall(true);
		};

		window.addEventListener(
			'beforeinstallprompt',
			handleBeforeInstall as EventListener,
		);

		return () => {
			window.removeEventListener(
				'beforeinstallprompt',
				handleBeforeInstall as EventListener,
			);
		};
	}, []);

	const handleInstall = async () => {
		if (!deferredPrompt) {
			return;
		}

		await deferredPrompt.prompt();
		const { outcome } = await deferredPrompt.userChoice;
		logger.log(`User response to the install prompt: ${outcome}`);

		setDeferredPrompt(null);
		setCanInstall(false);

		if (outcome === 'accepted') {
			localStorage.setItem(PWA_INSTALLED_MARKER, 'true');
			setShowPrompt(false);
		}
	};

	const handleDismiss = () => {
		setCanInstall(false);
		setShowPrompt(false);
		localStorage.setItem(PWA_INSTALLED_MARKER, 'true');
	};

	return {
		canInstall,
		showPrompt,
		isMobileDevice: isMobileDevice(),
		handleInstall,
		handleDismiss,
	};
};
