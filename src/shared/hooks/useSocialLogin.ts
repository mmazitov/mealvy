import { useCallback, useEffect, useRef } from 'react';

const API_BASE_URL =
	import.meta.env.VITE_API_BASE_URL ||
	import.meta.env.VITE_API_URL?.replace('/graphql', '') ||
	'http://localhost:4000';

const POLL_INTERVAL_MS = 1500;
const MAX_POLL_ATTEMPTS = 60;

const POPUP_WIDTH = 500;
const POPUP_HEIGHT = 600;

interface UseSocialLoginOptions {
	login: () => Promise<boolean>;
	onSuccess: () => void;
}

interface UseSocialLoginResult {
	loginWithProvider: (provider: string) => void;
}

export const useSocialLogin = ({
	login,
	onSuccess,
}: UseSocialLoginOptions): UseSocialLoginResult => {
	const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

	const stopPolling = useCallback(() => {
		if (pollRef.current) {
			clearInterval(pollRef.current);
			pollRef.current = null;
		}
	}, []);

	const finishIfAuthenticated = useCallback(async () => {
		const authenticated = await login();
		if (authenticated) {
			stopPolling();
			onSuccess();
		}
		return authenticated;
	}, [login, onSuccess, stopPolling]);

	const loginWithProvider = useCallback(
		(provider: string) => {
			const authUrl = `${API_BASE_URL}/auth/${provider}-auth`;
			const left = (window.innerWidth - POPUP_WIDTH) / 2;
			const top = (window.innerHeight - POPUP_HEIGHT) / 2;

			window.open(
				authUrl,
				'oauth-popup',
				`width=${POPUP_WIDTH},height=${POPUP_HEIGHT},left=${left},top=${top}`,
			);

			stopPolling();
			let attempts = 0;
			pollRef.current = setInterval(async () => {
				attempts += 1;
				try {
					await finishIfAuthenticated();
				} catch (error) {
					if (import.meta.env.DEV)
						console.error('[OAuth] session poll failed:', error);
				}
				if (attempts >= MAX_POLL_ATTEMPTS) stopPolling();
			}, POLL_INTERVAL_MS);
		},
		[finishIfAuthenticated, stopPolling],
	);

	useEffect(() => {
		const expectedOrigin = API_BASE_URL.replace(/\/$/, '');

		const handleMessage = async (event: MessageEvent) => {
			if (!event.data || typeof event.data !== 'object' || !event.data.type)
				return;

			if (!event.data.type.startsWith('OAUTH_')) return;

			if (event.origin.replace(/\/$/, '') !== expectedOrigin) return;

			if (event.data.type === 'OAUTH_SUCCESS') {
				try {
					await finishIfAuthenticated();
				} catch (error) {
					if (import.meta.env.DEV)
						console.error('[OAuth] login() failed:', error);
				}
			} else if (event.data.type === 'OAUTH_ERROR') {
				stopPolling();
				if (import.meta.env.DEV)
					console.error('[OAuth] Error:', event.data.error);
			}
		};

		window.addEventListener('message', handleMessage);
		return () => {
			window.removeEventListener('message', handleMessage);
			stopPolling();
		};
	}, [finishIfAuthenticated, stopPolling]);

	return { loginWithProvider };
};
