import { useMemo } from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import { useSchemaOrg } from '@/shared/hooks';
import {
	type BreadcrumbItem,
	generateBreadcrumbSchema,
} from '@/shared/lib/utils/schemaOrg';

interface BreadcrumbProps {
	items: BreadcrumbItem[];
}

export const Breadcrumb = ({ items }: BreadcrumbProps) => {
	const schema = useMemo(() => generateBreadcrumbSchema(items), [items]);
	useSchemaOrg(schema);

	return (
		<nav aria-label="Breadcrumb" className="mb-4">
			<ul className="text-muted-foreground flex items-center gap-2 text-sm">
				{items.map((item, index) => (
					<li key={item.url} className="flex items-center gap-2">
						{index > 0 && <ChevronRight className="h-4 w-4" />}
						{index === items.length - 1 ? (
							<span className="text-foreground font-medium">{item.name}</span>
						) : (
							<Link
								to={item.url}
								className="hover:text-foreground transition-colors"
							>
								{item.name}
							</Link>
						)}
					</li>
				))}
			</ul>
		</nav>
	);
};
