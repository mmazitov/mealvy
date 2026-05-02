import { ApolloClient, InMemoryCache } from '@apollo/client';
import { CombinedGraphQLErrors } from '@apollo/client/errors';
import { ErrorLink } from '@apollo/client/link/error';
import { HttpLink } from '@apollo/client/link/http';
import { Observable } from '@apollo/client/utilities';

import { refreshAccessToken } from './refreshToken';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/graphql';

let onUnauthenticated: (() => void) | null = null;
let refreshFailed = false;

export const setUnauthenticatedHandler = (handler: (() => void) | null) => {
	onUnauthenticated = handler;
	if (handler) refreshFailed = false;
};

const httpLink = new HttpLink({
	uri: API_URL,
	credentials: 'include',
});

let refreshing: Promise<boolean> | null = null;

const errorLink = new ErrorLink(({ error, operation, forward }) => {
	const isUnauth =
		CombinedGraphQLErrors.is(error) &&
		error.errors.some(
			(e) =>
				e.extensions?.code === 'UNAUTHENTICATED' ||
				e.message?.toLowerCase().includes('unauthenticated') ||
				e.message?.toLowerCase().includes('not authenticated'),
		);

	if (isUnauth) {
		if (!onUnauthenticated || refreshFailed) {
			return;
		}

		if (!refreshing) {
			refreshing = refreshAccessToken().finally(() => {
				refreshing = null;
			});
		}

		return new Observable((observer) => {
			(refreshing as Promise<boolean>)
				.then((ok) => {
					if (ok) {
						const sub = forward(operation).subscribe({
							next: observer.next.bind(observer),
							error: observer.error.bind(observer),
							complete: observer.complete.bind(observer),
						});
						return () => sub.unsubscribe();
					} else {
						refreshFailed = true;
						onUnauthenticated?.();
						observer.error(new Error('Session expired'));
					}
				})
				.catch((err) => observer.error(err));
		});
	}

	// Network / HTTP 401
	if (
		!CombinedGraphQLErrors.is(error) &&
		'statusCode' in error &&
		(error as { statusCode?: number }).statusCode === 401
	) {
		onUnauthenticated?.();
	}

	if (import.meta.env.DEV) {
		if (CombinedGraphQLErrors.is(error)) {
			error.errors.forEach((e) =>
				console.error(`[GraphQL] ${e.message}`, e.extensions?.code),
			);
		} else {
			console.error('[Network]', error);
		}
	}
});

export const client = new ApolloClient({
	link: errorLink.concat(httpLink),
	cache: new InMemoryCache(),
	defaultOptions: {
		query: { fetchPolicy: 'cache-first' },
		watchQuery: { fetchPolicy: 'cache-first' },
	},
});
