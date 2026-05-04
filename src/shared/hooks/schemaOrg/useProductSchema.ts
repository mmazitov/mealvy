import { useSchemaOrg } from './useSchemaOrg';

import { type ProductFieldsFragment } from '@/shared/api/graphql';
import { generateProductSchema } from '@/shared/lib/utils/schemaOrg';


export const useProductSchema = (product: ProductFieldsFragment | null): void => {
	const schema = product
		? generateProductSchema({
				name: product.name,
				description:
					product.description ??
					`Продукт ${product.name} з детальною поживною інформацією`,
				image: product.imageUrl ?? 'https://mealvy.vercel.app/icon-512.png',
				brand: 'Mealvy',
				calories: product.calories ?? 0,
				protein: product.protein ?? 0,
				fat: product.fat ?? 0,
				carbs: product.carbs ?? 0,
			})
		: null;
	useSchemaOrg(schema);
};
