const SESSION_HINT_KEY = 'mealvy.session';

export const markSessionActive = (): void => {
	try {
		localStorage.setItem(SESSION_HINT_KEY, '1');
		// eslint-disable-next-line no-empty
	} catch {}
};

export const clearSessionHint = (): void => {
	try {
		localStorage.removeItem(SESSION_HINT_KEY);
		// eslint-disable-next-line no-empty
	} catch {}
};

export const hasSessionHint = (): boolean => {
	try {
		return localStorage.getItem(SESSION_HINT_KEY) === '1';
	} catch {
		return false;
	}
};
