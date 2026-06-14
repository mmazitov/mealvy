import { useCallback, useEffect } from 'react';

import { client, setUnauthenticatedHandler } from '@/shared/api/apollo';
import { clearSessionHint, markSessionActive } from '@/shared/api/sessionHint';
import { useLogoutMutation, useMeQuery } from '@/shared/api/graphql';

export const useAuthState = () => {
	const { data, loading, refetch } = useMeQuery({
		fetchPolicy: 'network-only',
		errorPolicy: 'all',
	});
	const [logoutMutation] = useLogoutMutation();

	const user = data?.me ?? null;
	const isAuthenticated = !!user;
	const isAdmin = user?.role === 'ADMIN';

	const logout = useCallback(async () => {
		try {
			await logoutMutation();
		} catch {
			// Logout is safe even on error — reset client state anyway
		} finally {
			clearSessionHint();
			await client.resetStore().catch(() => {});
			// Evict cached per-user data from the Service Worker so the next
			// user on a shared device can't read it from Cache Storage
			navigator.serviceWorker?.controller?.postMessage({
				type: 'CLEAR_DATA_CACHE',
			});
		}
	}, [logoutMutation]);

	useEffect(() => {
		setUnauthenticatedHandler(logout);
		return () => setUnauthenticatedHandler(null);
	}, [logout]);

	useEffect(() => {
		if (user) markSessionActive();
	}, [user]);

	const login = useCallback(async () => {
		const { data: refetched } = await refetch();
		return !!refetched?.me;
	}, [refetch]);

	return {
		user,
		login,
		logout,
		isLoading: loading,
		isAuthenticated,
		isAdmin,
	};
};
