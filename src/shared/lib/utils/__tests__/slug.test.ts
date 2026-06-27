import { describe, expect, it } from 'vitest';

import { createSlug, extractId, toEntityPath } from '../slug';

const OBJECT_ID = '507f1f77bcf86cd799439011';

describe('createSlug', () => {
	it('collapses punctuation like parentheses into hyphens', () => {
		expect(decodeURIComponent(createSlug('Базилік (свіжий)'))).toBe(
			'базилік-свіжий',
		);
	});

	it('drops leading and trailing separators', () => {
		expect(decodeURIComponent(createSlug('  Café, 50%  '))).toBe('café-50');
	});
});

describe('extractId', () => {
	it('recovers the id from a path built by toEntityPath', () => {
		const path = toEntityPath('Базилік (свіжий)', OBJECT_ID);

		expect(extractId(decodeURIComponent(path))).toBe(OBJECT_ID);
	});

	it('returns the id even when the name itself contains hyphens', () => {
		const path = toEntityPath('Соус барбекю-гриль', OBJECT_ID);

		expect(extractId(decodeURIComponent(path))).toBe(OBJECT_ID);
	});

	it('returns the id when the name produces an empty cosmetic slug', () => {
		const path = toEntityPath('   ', OBJECT_ID);

		expect(extractId(path)).toBe(OBJECT_ID);
	});
});
