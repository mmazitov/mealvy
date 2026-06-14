import { SkeletonBody } from '@/shared/components';

const CATEGORY_ITEM_COUNTS = [4, 3, 5];

export const ShoppingListSkeleton = () => {
	return (
		<div className="space-y-6">
			{CATEGORY_ITEM_COUNTS.map((itemCount, categoryIndex) => (
				<div key={categoryIndex} className="space-y-3">
					<div className="flex items-center gap-2">
						<SkeletonBody className="h-5 w-5 rounded-full" />
						<SkeletonBody className="h-6 w-24 rounded-full" />
						<SkeletonBody className="h-4 w-6" />
					</div>
					<ul className="space-y-2 pl-0">
						{Array.from({ length: itemCount }).map((_, itemIndex) => (
							<li
								key={itemIndex}
								className="flex items-center gap-3 rounded-lg border p-3"
							>
								<SkeletonBody className="h-5 w-5 rounded-sm" />
								<div className="flex flex-1 items-center justify-between">
									<SkeletonBody className="h-5 w-40" />
									<SkeletonBody className="h-4 w-16" />
								</div>
							</li>
						))}
					</ul>
				</div>
			))}
		</div>
	);
};
