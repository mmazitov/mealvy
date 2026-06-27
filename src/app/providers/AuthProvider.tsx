import { useMemo } from 'react';

import { AuthContext } from '@/features/auth/model/AuthContext';
import { useAuthState } from '@/features/auth/hooks/useAuthState';

interface AuthProviderProps {
	children: React.ReactNode;
}

// Don't block the whole app on the initial `me` request — public pages render
// immediately; ProtectedRoute handles the isLoading state itself
export const AuthProvider = ({ children }: AuthProviderProps) => {
	const authState = useAuthState();

	const value = useMemo(
		() => ({
			user: authState.user,
			login: authState.login,
			logout: authState.logout,
			isLoading: authState.isLoading,
			isAuthenticated: authState.isAuthenticated,
			isAdmin: authState.isAdmin,
		}),
		[
			authState.user,
			authState.login,
			authState.logout,
			authState.isLoading,
			authState.isAuthenticated,
			authState.isAdmin,
		],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
