import { Card, CardContent, Separator, SkeletonBody } from '@/shared/components';

const CardFullSkeleton = () => {
	return (
		<div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
			<div className="space-y-4 lg:col-span-2">
				<SkeletonBody className="h-72 w-full rounded-lg" />

				<SkeletonBody className="h-6 w-24 rounded-full" />
				<SkeletonBody className="h-10 w-2/3" />
				<SkeletonBody className="h-5 w-32" />
				<SkeletonBody className="h-5 w-full" />

				<Separator />

				<div className="space-y-3">
					<SkeletonBody className="h-7 w-40" />
					{Array.from({ length: 5 }).map((_, index) => (
						<SkeletonBody key={index} className="h-5 w-full" />
					))}
				</div>

				<div className="space-y-3">
					<SkeletonBody className="h-7 w-40" />
					{Array.from({ length: 3 }).map((_, index) => (
						<SkeletonBody key={index} className="h-12 w-full" />
					))}
				</div>
			</div>

			<Card>
				<CardContent className="space-y-4 p-6">
					<SkeletonBody className="h-7 w-32" />
					{Array.from({ length: 4 }).map((_, index) => (
						<div key={index} className="flex justify-between">
							<SkeletonBody className="h-5 w-24" />
							<SkeletonBody className="h-5 w-12" />
						</div>
					))}
				</CardContent>
			</Card>
		</div>
	);
};

export default CardFullSkeleton;
