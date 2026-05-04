import { METADATA_CONFIG } from '@/shared/lib/config';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://mealvy.vercel.app';

export interface BreadcrumbItem {
	name: string;
	url: string;
}

export interface ItemListSchemaItem {
	name: string;
	url: string;
	image?: string;
	description?: string;
}

interface RecipeSchema {
	name: string;
	description: string;
	image: string;
	prepTime: number;
	cookTime: number;
	servings: number;
	calories: number;
	ingredients: string[];
	instructions: string[];
}

interface ProductSchema {
	name: string;
	description: string;
	image: string;
	brand: string;
	calories: number;
	protein: number;
	fat: number;
	carbs: number;
}

interface MenuItemInput {
	mealTime: string;
	dish: {
		name: string;
		imageUrl?: string | null;
		calories?: number | null;
	};
}

interface MenuSchemaInput {
	name: string;
	description: string;
	items: MenuItemInput[];
}

/**
 * Prevents script tag injection in JSON-LD structured data.
 * Replaces </script sequences that could break the enclosing script tag.
 */
const sanitizeJsonLdString = (value: string): string =>
	value.replace(/<\/script/gi, '<\\/script');

export const generateRecipeSchema = (recipe: RecipeSchema) => ({
	'@context': 'https://schema.org/',
	'@type': 'Recipe',
	name: sanitizeJsonLdString(recipe.name),
	description: sanitizeJsonLdString(recipe.description),
	image: recipe.image,
	author: {
		'@type': 'Organization',
		name: 'Mealvy',
	},
	prepTime: `PT${recipe.prepTime}M`,
	cookTime: `PT${recipe.cookTime}M`,
	totalTime: `PT${recipe.prepTime + recipe.cookTime}M`,
	recipeYield: `${recipe.servings} servings`,
	nutrition: {
		'@type': 'NutritionInformation',
		calories: `${recipe.calories} calories`,
	},
	recipeIngredient: recipe.ingredients.map(sanitizeJsonLdString),
	recipeInstructions: recipe.instructions.map((instruction, index) => ({
		'@type': 'HowToStep',
		position: index + 1,
		text: sanitizeJsonLdString(instruction),
	})),
});

export const generateProductSchema = (product: ProductSchema) => ({
	'@context': 'https://schema.org/',
	'@type': 'Product',
	name: sanitizeJsonLdString(product.name),
	description: sanitizeJsonLdString(product.description),
	image: product.image,
	brand: {
		'@type': 'Brand',
		name: sanitizeJsonLdString(product.brand),
	},
	nutrition: {
		'@type': 'NutritionInformation',
		calories: `${product.calories} calories`,
		carbohydrateContent: `${product.carbs}g`,
		proteinContent: `${product.protein}g`,
		fatContent: `${product.fat}g`,
	},
});

export const generateOrganizationSchema = () => ({
	'@context': 'https://schema.org',
	'@type': 'Organization',
	name: 'Mealvy',
	url: SITE_URL,
	logo: `${SITE_URL}/logo.png`,
	description: 'Your personal meal planner and recipe manager',
	sameAs: [
		`https://www.facebook.com/${METADATA_CONFIG.social.facebook}`,
		`https://twitter.com/${METADATA_CONFIG.social.twitter.replace('@', '')}`,
		`https://www.instagram.com/${METADATA_CONFIG.social.instagram.replace('@', '')}`,
	],
	contactPoint: {
		'@type': 'ContactPoint',
		contactType: 'Customer Support',
		email: 'support@mealvy.com',
	},
});

export const generateWebSiteSchema = () => ({
	'@context': 'https://schema.org',
	'@type': 'WebSite',
	name: 'Mealvy',
	url: SITE_URL,
	potentialAction: {
		'@type': 'SearchAction',
		target: {
			'@type': 'EntryPoint',
			urlTemplate: `${SITE_URL}/dishes?search={search_term_string}`,
		},
		'query-input': 'required name=search_term_string',
	},
});

export const generateBreadcrumbSchema = (breadcrumbs: BreadcrumbItem[]) => ({
	'@context': 'https://schema.org',
	'@type': 'BreadcrumbList',
	itemListElement: breadcrumbs.map((crumb, index) => ({
		'@type': 'ListItem',
		position: index + 1,
		name: crumb.name,
		item: crumb.url,
	})),
});

export const generateItemListSchema = (
	items: ItemListSchemaItem[],
	type: 'Recipe' | 'Product' | 'MenuItem',
) => ({
	'@context': 'https://schema.org',
	'@type': 'ItemList',
	itemListElement: items.map((item, index) => ({
		'@type': 'ListItem',
		position: index + 1,
		item: {
			'@type': type,
			'@id': item.url,
			name: sanitizeJsonLdString(item.name),
			...(item.image && { image: item.image }),
			...(item.description && {
				description: sanitizeJsonLdString(item.description),
			}),
		},
	})),
});

export const generateMenuSchema = (menu: MenuSchemaInput) => {
	const sections = menu.items.reduce<Record<string, MenuItemInput[]>>(
		(acc, item) => {
			const existing = acc[item.mealTime] ?? [];
			return { ...acc, [item.mealTime]: [...existing, item] };
		},
		{},
	);

	return {
		'@context': 'https://schema.org',
		'@type': 'Menu',
		name: sanitizeJsonLdString(menu.name),
		description: sanitizeJsonLdString(menu.description),
		hasMenuSection: Object.entries(sections).map(([mealTime, items]) => ({
			'@type': 'MenuSection',
			name: mealTime,
			hasMenuItem: items.map((item) => ({
				'@type': 'MenuItem',
				name: sanitizeJsonLdString(item.dish.name),
				...(item.dish.imageUrl && { image: item.dish.imageUrl }),
				...(item.dish.calories != null && {
					nutrition: {
						'@type': 'NutritionInformation',
						calories: `${item.dish.calories} calories`,
					},
				}),
			})),
		})),
	};
};
