import { useEffect } from 'react';

export const useSchemaOrg = (schema: Record<string, unknown> | null): void => {
	const serialized = schema ? JSON.stringify(schema) : null;

	useEffect(() => {
		if (!serialized) return;
		const script = document.createElement('script');
		script.type = 'application/ld+json';
		script.text = serialized;
		document.head.appendChild(script);
		return () => script.remove();
	}, [serialized]);
};
