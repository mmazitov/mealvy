import { useSchemaOrg } from './useSchemaOrg';

import { type DishFieldsFragment } from '@/shared/api/graphql';
import { METADATA_CONFIG } from '@/shared/lib/config';
import { generateRecipeSchema } from '@/shared/lib/utils/schemaOrg';


export const useRecipeSchema = (dish: DishFieldsFragment | null): void => {
	const schema = dish
		? generateRecipeSchema({
				name: dish.name,
				description: dish.description ?? 'Смачна страва від Mealvy',
				image: dish.imageUrl ?? `${METADATA_CONFIG.site.url}/icon-512.png`,
				prepTime: dish.prepTime ?? 0,
				cookTime: 0,
				servings: dish.servings ?? 1,
				calories: dish.calories ?? 0,
				ingredients: dish.ingredients.map(
					(ing) => `${ing.name} - ${ing.amount}`,
				),
				instructions: dish.instructions,
			})
		: null;
	useSchemaOrg(schema);
};
