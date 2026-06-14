import { useParams } from 'react-router-dom';

import { CardCompact } from '@/features/dishes';
import { useMenuDetail } from '@/features/menus';
import {
	Breadcrumb,
	Card,
	CardContent,
	ErrorState,
	Filter,
	MetaData,
	PageTitle,
} from '@/shared/components';
import { Grid } from '@/shared/components/grid';
import { Loader } from '@/shared/components/loader';
import { Skeleton } from '@/shared/components/skeleton';
import { useBreadcrumbs, useMenuSchema } from '@/shared/hooks';
import { METADATA_CONFIG } from '@/shared/lib/config';

const MenuDetail = () => {
	const { id } = useParams<{ id: string }>();

	const {
		menu,
		loading,
		error,
		selectedDay,
		setSelectedDay,
		weekDaysForFilter,
		dishesForGrid,
	} = useMenuDetail(id);

	useMenuSchema(menu ?? null);

	const breadcrumbItems = useBreadcrumbs({
		title: loading ? undefined : (menu?.name ?? undefined),
	});

	if (loading) return <Loader />;

	if (error) {
		if (import.meta.env.DEV)
			console.error('[MenuDetail] Failed to load menu:', id, error.message);
		return (
			<ErrorState message="Не вдалося завантажити меню. Спробуйте оновити сторінку." />
		);
	}

	if (!menu) {
		return <ErrorState message="Меню не знайдено" />;
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<MetaData
				noindex
				title={`${menu.name} | ${METADATA_CONFIG.titles.menu}`}
				description={METADATA_CONFIG.descriptions.menu}
				keywords={METADATA_CONFIG.keywords.menu}
				type="website"
			/>
			<Breadcrumb items={breadcrumbItems} />
			<PageTitle
				title={menu.name}
				subtitle={`${menu.totalDishes} страв • ${menu.totalCalories.toLocaleString()} ккал`}
				buttonVisible={false}
			/>
			<div className="space-y-6">
				<Card className="border-border/60 bg-card/50 shadow-sm backdrop-blur-sm">
					<CardContent className="p-4 md:p-6">
						<Filter
							selectedCategory={selectedDay}
							onCategoryChange={setSelectedDay}
							categories={weekDaysForFilter}
							tabListClassName="grid h-auto w-full grid-cols-4 gap-1 md:grid-cols-7 md:gap-2"
						/>
					</CardContent>
				</Card>

				{dishesForGrid.length > 0 ? (
					<Grid
						items={dishesForGrid}
						itemComponent={CardCompact}
						showEmpty={false}
						isLoading={false}
						skeletonComponent={Skeleton}
						skeletonCount={4}
					/>
				) : (
					<div className="py-12 text-center">
						<p className="text-muted-foreground">
							Немає страв на {selectedDay}
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default MenuDetail;
