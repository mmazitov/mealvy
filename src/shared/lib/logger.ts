const isDev = import.meta.env.DEV;

/**
 * Centralized logging facade for the app.
 *
 * `log` and `warn` are development-only: they must never reach a production
 * console. `error` always reports — it is the single integration point for a
 * production error-monitoring service.
 */
export const logger = {
	log: (...args: unknown[]): void => {
		if (isDev) console.log(...args);
	},
	warn: (...args: unknown[]): void => {
		if (isDev) console.warn(...args);
	},
	error: (...args: unknown[]): void => {
		// NOTE: forward to Sentry/monitoring here once a reporter is integrated.
		console.error(...args);
	},
};
