import { useSchemaOrg } from './useSchemaOrg';

import { type ProductFieldsFragment } from '@/shared/api/graphql';
import { METADATA_CONFIG } from '@/shared/lib/config';
import { generateProductSchema } from '@/shared/lib/utils/schemaOrg';


export const useProductSchema = (product: ProductFieldsFragment | null): void => {
	const schema = product
		? generateProductSchema({
				name: product.name,
				description:
					product.description ??
					`Продукт ${product.name} з детальною поживною інформацією`,
				image: product.imageUrl ?? `${METADATA_CONFIG.site.url}/icon-512.png`,
				brand: 'Mealvy',
				calories: product.calories ?? undefined,
				protein: product.protein ?? undefined,
				fat: product.fat ?? undefined,
				carbs: product.carbs ?? undefined,
			})
		: null;
	useSchemaOrg(schema);
};
