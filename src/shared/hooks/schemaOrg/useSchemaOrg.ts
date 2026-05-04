import { useEffect } from 'react';

import { type SchemaOrgNode } from '@/shared/lib/utils/schemaOrg';

const trySerialize = (schema: SchemaOrgNode): string | null => {
	try {
		return JSON.stringify(schema);
	} catch {
		return null;
	}
};

export const useSchemaOrg = (schema: SchemaOrgNode | null): void => {
	const serialized = schema ? trySerialize(schema) : null;

	useEffect(() => {
		if (!serialized) return;
		const script = document.createElement('script');
		script.type = 'application/ld+json';
		script.text = serialized;
		document.head.appendChild(script);
		return () => script.remove();
	}, [serialized]);
};
