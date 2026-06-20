import { Badge } from '@/shared/components';
import { categoryBadgeMap } from '@/shared/lib/utils/categoryBadge';

interface TitleProps {
	name: string;
	category: string | null | undefined;
	description?: string | null;
}

const Title = ({ name, category, description }: TitleProps) => {
	const badgeClass =
		category && categoryBadgeMap[category]
			? categoryBadgeMap[category]
			: 'bg-muted text-muted-foreground';
	return (
		<div className="flex items-start justify-between gap-2 px-4">
			<h3 className="text-foreground line-clamp-4 min-w-0 flex-1 text-base font-semibold">
				{name}
			</h3>
			{category && (
				<Badge
					variant="category"
					className={`flex shrink-0 text-xs ${badgeClass}`}
				>
					{category}
				</Badge>
			)}
			{description && (
				<p className="text-muted-foreground col-span-2 line-clamp-1 text-sm">
					{description}
				</p>
			)}
		</div>
	);
};

export default Title;
