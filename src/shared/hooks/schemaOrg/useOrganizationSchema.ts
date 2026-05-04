import { useSchemaOrg } from './useSchemaOrg';

import {
	generateOrganizationSchema,
	generateWebSiteSchema,
} from '@/shared/lib/utils/schemaOrg';

const ORG_SCHEMA = generateOrganizationSchema();
const WEBSITE_SCHEMA = generateWebSiteSchema();

export const useOrganizationSchema = (): void => {
	useSchemaOrg(ORG_SCHEMA);
	useSchemaOrg(WEBSITE_SCHEMA);
};
