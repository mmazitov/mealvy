import { useSchemaOrg } from './useSchemaOrg';

import {
	generateOrganizationSchema,
	generateWebSiteSchema,
} from '@/shared/lib/utils/schemaOrg';


export const useOrganizationSchema = (): void => {
	useSchemaOrg(generateOrganizationSchema());
	useSchemaOrg(generateWebSiteSchema());
};
