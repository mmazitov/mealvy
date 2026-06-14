import { logger } from '@/shared/lib/logger';

const API_BASE_URL =
	import.meta.env.VITE_API_BASE_URL ||
	import.meta.env.VITE_API_URL?.replace('/graphql', '') ||
	'http://localhost:4000';

export const refreshAccessToken = async (): Promise<boolean> => {
	try {
		const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
			method: 'POST',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
		});

		if (!response.ok) {
			logger.warn('[Token Refresh] Failed:', response.status);
			return false;
		}

		logger.log('[Token Refresh] Success');
		return true;
	} catch (error) {
		logger.error('[Token Refresh] Error:', error);
		return false;
	}
};
