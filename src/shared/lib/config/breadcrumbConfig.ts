// src/shared/lib/breadcrumbs/breadcrumbConfig.ts
import type { BreadcrumbItem } from '@/shared/lib/utils/schemaOrg';

interface BreadcrumbRouteConfig {
	label: string;
	parentPattern?: string;
}

// More specific (static / deeper) patterns MUST appear before their
// dynamic counterparts so matchRoutePattern tries them first.
const BREADCRUMB_ROUTES: Record<string, BreadcrumbRouteConfig> = {
	'/': { label: 'Головна' },
	'/products': { label: 'Продукти', parentPattern: '/' },
	'/dishes': { label: 'Страви', parentPattern: '/' },
	'/menus': { label: 'Меню', parentPattern: '/' },
	'/favorites': { label: 'Обране', parentPattern: '/' },
	'/settings': { label: 'Налаштування', parentPattern: '/' },
	'/profile': { label: 'Профіль', parentPattern: '/' },
	'/schedule': { label: 'Розклад', parentPattern: '/' },
	'/shopping-list': { label: 'Список покупок', parentPattern: '/' },
	'/menu-planner': { label: 'Планувальник меню', parentPattern: '/' },
	// Static sub-routes before dynamic :id patterns
	'/products/add': { label: 'Додати продукт', parentPattern: '/products' },
	'/dishes/add': { label: 'Додати страву', parentPattern: '/dishes' },
	// Edit routes — parent is the list page (no intermediate :title needed)
	'/product/edit/:id': { label: 'Редагувати', parentPattern: '/products' },
	'/dish/edit/:id': { label: 'Редагувати', parentPattern: '/dishes' },
	// Dynamic detail routes
	'/product/:id': { label: ':title', parentPattern: '/products' },
	'/dish/:id': { label: ':title', parentPattern: '/dishes' },
	'/menu/:id': { label: ':title', parentPattern: '/menus' },
	'/profile/accept-invitation/:invitationId': {
		label: 'Запрошення',
		parentPattern: '/profile',
	},
};

interface MatchResult {
	pattern: string;
	params: Record<string, string>;
}

function patternToRegex(pattern: string): RegExp {
	const escaped = pattern.replace(/\//g, '\\/').replace(/:[\w]+/g, '([^/]+)');
	return new RegExp(`^${escaped}$`);
}

function extractParams(
	pattern: string,
	match: RegExpMatchArray,
): Record<string, string> {
	const params: Record<string, string> = {};
	const names = [...pattern.matchAll(/:(\w+)/g)].map((m) => m[1]);
	names.forEach((name, i) => {
		if (name) params[name] = match[i + 1] ?? '';
	});
	return params;
}

export function matchRoutePattern(pathname: string): MatchResult | null {
	const normalized =
		pathname.endsWith('/') && pathname.length > 1
			? pathname.slice(0, -1)
			: pathname;

	for (const pattern of Object.keys(BREADCRUMB_ROUTES)) {
		const regex = patternToRegex(pattern);
		const match = normalized.match(regex);
		if (match) {
			return { pattern, params: extractParams(pattern, match) };
		}
	}
	return null;
}

export function resolvePatternUrl(
	pattern: string,
	params: Record<string, string>,
): string {
	return pattern.replace(/:(\w+)/g, (_, key: string) => params[key] ?? '');
}

export function buildBreadcrumbTrail(
	pathname: string,
	title?: string,
	fromPath?: string,
	parent?: BreadcrumbItem,
): BreadcrumbItem[] {
	const matched = matchRoutePattern(pathname);
	if (!matched) return [{ name: 'Головна', url: '/' }];

	const { pattern, params } = matched;

	// Dish navigated from a menu detail page — override the default parent chain
	if (pattern === '/dish/:id' && fromPath) {
		const menuId = fromPath.match(/^\/menu\/([^/]+)/)?.[1];
		if (menuId) {
			return [
				{ name: 'Головна', url: '/' },
				{ name: 'Меню', url: '/menus' },
				{ name: 'Деталі меню', url: `/menu/${menuId}` },
				{ name: title ?? params.id ?? '', url: pathname },
			];
		}
	}

	const trail: BreadcrumbItem[] = [];
	let currentPattern: string | undefined = pattern;
	let isLeaf = true;

	while (currentPattern) {
		const config: BreadcrumbRouteConfig | undefined = BREADCRUMB_ROUTES[currentPattern];
		if (!config) break;

		const url = resolvePatternUrl(currentPattern, params);
		const label =
			config.label === ':title'
				? isLeaf
					? (title ?? params.id ?? '')
					: (params.id ?? '')
				: config.label;

		trail.unshift({ name: label, url });
		currentPattern = config.parentPattern;
		isLeaf = false;
	}

	// Insert explicit parent before the leaf when provided
	if (parent && trail.length >= 1) {
		trail.splice(trail.length - 1, 0, parent);
	}

	return trail;
}
