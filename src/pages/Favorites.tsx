import { FavoriteDishes, useFavoriteDishes } from '@/features/dishes';
import { FavoriteProducts, useFavoriteProducts } from '@/features/products';
import {
	Breadcrumb,
	MetaData,
	PageTitle,
	SkeletonBody,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/shared/components';
import { Skeleton } from '@/shared/components/skeleton';
import { PAGE_TITLE, FAVORITE_TABS, ITEMS_PER_PAGE } from '@/shared/constants';
import { useBreadcrumbs, useTabsWithAutoSwitch } from '@/shared/hooks';
import { METADATA_CONFIG } from '@/shared/lib/config';

const Favorites = () => {
	const breadcrumbItems = useBreadcrumbs();
	const { dishes, loading: dishesLoading } = useFavoriteDishes();
	const { products, loading: productsLoading } = useFavoriteProducts();

	const isLoading = dishesLoading || productsLoading;

	const tabs = FAVORITE_TABS.map((tab) => ({
		...tab,
		disabled:
			!isLoading &&
			((tab.value === 'dishes' && dishes.length === 0) ||
				(tab.value === 'products' && products.length === 0)),
	}));

	const { activeTab, setActiveTab, isReady } = useTabsWithAutoSwitch({
		tabs,
		defaultTab: 'dishes',
		isLoading,
	});

	return (
		<div className="container mx-auto px-4 py-8">
			<Breadcrumb items={breadcrumbItems} />
			<MetaData
				title={METADATA_CONFIG.titles.favorites}
				description={METADATA_CONFIG.descriptions.favorites}
				keywords={METADATA_CONFIG.keywords.favorites}
				type="website"
			/>

			<PageTitle
				title={PAGE_TITLE.favorites.title}
				subtitle={PAGE_TITLE.favorites.subtitle}
				buttonVisible={false}
			/>

			{!isReady ? (
				<>
					<div className="mb-6 inline-flex h-10 items-center gap-1 rounded-md bg-muted p-1">
						{FAVORITE_TABS.map((tab) => (
							<SkeletonBody key={tab.value} className="h-7 w-20 rounded-sm" />
						))}
					</div>
					<div className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
						{Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
							<Skeleton key={i} />
						))}
					</div>
				</>
			) : (
				<Tabs value={activeTab} onValueChange={setActiveTab}>
					<TabsList className="mb-6 inline-flex">
						{tabs.map((tab) => (
							<TabsTrigger
								key={tab.value}
								value={tab.value}
								disabled={tab.disabled}
							>
								{tab.title}
							</TabsTrigger>
						))}
					</TabsList>
					{tabs.map((tab) => (
						<TabsContent key={tab.value} value={tab.value} className="mt-0">
							{tab.value === tabs[0].value && <FavoriteDishes />}
							{tab.value === tabs[1].value && <FavoriteProducts />}
						</TabsContent>
					))}
				</Tabs>
			)}
		</div>
	);
};

export default Favorites;
