import { useLocation } from 'react-router-dom';

import { buildBreadcrumbTrail } from '@/shared/lib/config';
import type { BreadcrumbItem } from '@/shared/lib/utils/schemaOrg';

interface UseBreadcrumbsOptions {
	title?: string;
	parent?: BreadcrumbItem;
}

interface NavigationState {
	from?: string;
}

function isNavigationState(s: unknown): s is NavigationState {
	return (
		typeof s === 'object' &&
		s !== null &&
		!Array.isArray(s) &&
		('from' in s
			? typeof (s as Record<string, unknown>).from === 'string'
			: true)
	);
}

export function useBreadcrumbs(
	options?: UseBreadcrumbsOptions,
): BreadcrumbItem[] {
	const location = useLocation();
	const navState = isNavigationState(location.state) ? location.state : null;

	return buildBreadcrumbTrail(
		location.pathname,
		options?.title,
		navState?.from,
		options?.parent,
	);
}
