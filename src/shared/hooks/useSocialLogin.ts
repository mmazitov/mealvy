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

	// Keep the latest callbacks in refs so the polling/message lifecycle never
	// depends on their identity. SocialList passes an inline onSuccess and the
	// auth context value is recreated on every render, so without this a single
	// re-render (e.g. the me-refetch flipping auth state) would tear the polling
	// interval down before the user finishes the OAuth flow.
	const loginRef = useRef(login);
	const onSuccessRef = useRef(onSuccess);
	loginRef.current = login;
	onSuccessRef.current = onSuccess;

	const stopPolling = useCallback(() => {
		if (pollRef.current) {
			clearInterval(pollRef.current);
			pollRef.current = null;
		}
	}, []);

	const finishIfAuthenticated = useCallback(async () => {
		const authenticated = await loginRef.current();
		if (authenticated) {
			stopPolling();
			onSuccessRef.current();
		}
		return authenticated;
	}, [stopPolling]);

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

			// NOTE: we poll the session blindly instead of watching popup.closed.
			// Google sets a COOP header that severs the opener<->popup link, after
			// which popup.closed reports `true` while the popup is still open — so
			// it can't be used to stop polling, and postMessage is unreliable too.
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
