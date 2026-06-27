import { useMemo, useState } from 'react';
import { PiPlusBold as Plus } from 'react-icons/pi';

import { CardCompact } from '@/features/dishes';
import { useDishesQuery } from '@/shared/api/graphql/dish.gen';
import {
	Breadcrumb,
	ErrorState,
	Filter,
	Grid,
	MetaData,
	PageTitle,
	Pagination,
	Search,
} from '@/shared/components';
import { Skeleton } from '@/shared/components/skeleton';
import {
	CATEGORIES_DISHES,
	ITEMS_PER_PAGE,
	PAGE_TITLE,
} from '@/shared/constants';
import {
	useBreadcrumbs,
	useDebounce,
	useServerPagination,
	useItemListSchema,
} from '@/shared/hooks';
import { METADATA_CONFIG } from '@/shared/lib/config';
import { type ItemListSchemaItem, toEntityPath } from '@/shared/lib/utils';

const Dishes = () => {
	const breadcrumbItems = useBreadcrumbs();
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('Усі');
	const debouncedSearch = useDebounce(searchQuery);

	const { currentPage, offset, limit, handlePageChange } = useServerPagination({
		itemsPerPage: ITEMS_PER_PAGE,
		resetKey: `${debouncedSearch}-${selectedCategory}`,
	});

	const { data, loading, error } = useDishesQuery({
		variables: {
			search: debouncedSearch || undefined,
			category: selectedCategory !== 'Усі' ? selectedCategory : undefined,
			limit,
			offset,
		},
		fetchPolicy: 'cache-and-network',
	});

	const dishes = data?.dishes ?? [];
	const totalItems = data?.dishesCount ?? 0;
	const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));

	const dishItems = useMemo<ItemListSchemaItem[]>(
		() =>
			(data?.dishes ?? []).map((dish) => ({
				name: dish.name,
				url: `${METADATA_CONFIG.site.url}/dish/${toEntityPath(dish.name, dish.id)}`,
				image: dish.imageUrl ?? undefined,
				description: dish.description ?? undefined,
			})),
		[data?.dishes],
	);
	useItemListSchema(dishItems, 'Recipe');

	const showPagination = !loading && totalPages > 1;

	if (error) {
		return (
			<ErrorState message="Не вдалося завантажити страви. Спробуйте оновити сторінку." />
		);
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<Breadcrumb items={breadcrumbItems} />
			<MetaData
				title={METADATA_CONFIG.titles.dishes}
				description={METADATA_CONFIG.descriptions.dishes}
				keywords={METADATA_CONFIG.keywords.dishes}
				type="website"
			/>
			<div className="mb-6">
				<PageTitle
					title={PAGE_TITLE.dishes.title}
					subtitle={PAGE_TITLE.dishes.subtitle}
					buttonType="link"
					buttonText={PAGE_TITLE.dishes.button}
					buttonIcon={<Plus />}
					href="/dishes/add"
				/>

				<Search
					searchQuery={searchQuery}
					onSearchChange={setSearchQuery}
					searchPlaceholder="Пошук страв..."
				/>

				<Filter
					selectedCategory={selectedCategory}
					onCategoryChange={setSelectedCategory}
					categories={CATEGORIES_DISHES}
				/>
			</div>

			<Grid
				items={dishes}
				itemComponent={CardCompact}
				emptyMessage="Страви не знайдено"
				showEmpty={true}
				isLoading={loading}
				skeletonComponent={Skeleton}
				skeletonCount={ITEMS_PER_PAGE}
			/>

			{showPagination && (
				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={handlePageChange}
					itemsPerPage={ITEMS_PER_PAGE}
					totalItems={totalItems}
					className="mt-8"
				/>
			)}
		</div>
	);
};

export default Dishes;
