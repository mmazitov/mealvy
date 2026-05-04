import { useSchemaOrg } from './useSchemaOrg';

import {
	type ItemListSchemaItem,
	generateItemListSchema,
} from '@/shared/lib/utils/schemaOrg';


export const useItemListSchema = (
	items: ItemListSchemaItem[],
	type: 'Recipe' | 'Product' | 'MenuItem',
): void => {
	const schema = items.length > 0 ? generateItemListSchema(items, type) : null;
	useSchemaOrg(schema);
};
