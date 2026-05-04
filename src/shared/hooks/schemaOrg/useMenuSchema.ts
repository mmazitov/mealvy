import { useSchemaOrg } from './useSchemaOrg';

import { type SavedMenuFieldsFragment } from '@/shared/api/graphql';
import { mealTimeToUI } from '@/shared/lib/utils';
import { generateMenuSchema } from '@/shared/lib/utils/schemaOrg';


export const useMenuSchema = (menu: SavedMenuFieldsFragment | null): void => {
	const schema = menu
		? generateMenuSchema({
				name: menu.name,
				description: `${menu.name}: ${menu.totalDishes} страв, ${menu.totalCalories} ккал`,
				items: menu.items.map((item) => ({
					mealTime: mealTimeToUI(item.mealTime),
					dish: {
						name: item.dish.name,
						imageUrl: item.dish.imageUrl,
						calories: item.dish.calories,
					},
				})),
			})
		: null;
	useSchemaOrg(schema);
};
