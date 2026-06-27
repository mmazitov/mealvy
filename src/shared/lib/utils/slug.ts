// The slug is cosmetic: lookups use the trailing id, so a renamed entity or an
// odd name like "Базилік (свіжий)" never produces a broken link. Any non
// letter/number run collapses to a single hyphen.
export const createSlug = (text: string): string => {
	return encodeURIComponent(
		text
			.toLowerCase()
			.trim()
			.replace(/[^\p{L}\p{N}]+/gu, '-')
			.replace(/^-+|-+$/g, ''),
	);
};

// `<cosmetic-slug>-<id>`. MongoDB ObjectIds are 24 hex chars with no hyphens,
// so the id is always recoverable as the final token (see `extractId`).
export const toEntityPath = (name: string, id: string): string =>
	`${createSlug(name)}-${id}`;

export const extractId = (slugWithId: string): string =>
	slugWithId.split('-').pop() ?? '';
