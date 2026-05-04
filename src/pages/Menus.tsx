import { SavedMenus, useSavedMenus } from '@/features/menus';
import { MenuCardSkeleton } from '@/features/menus/ui/menuCard';
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
import { PAGE_TITLE, MENU_TABS, ITEMS_PER_PAGE } from '@/shared/constants';
import { useBreadcrumbs, useTabsWithAutoSwitch, useItemListSchema } from '@/shared/hooks';
import { METADATA_CONFIG } from '@/shared/lib/config';
import { type ItemListSchemaItem } from '@/shared/lib/utils';

const Menus = () => {
	const breadcrumbItems = useBreadcrumbs();
	const { menus, loading } = useSavedMenus();

	const menuItems: ItemListSchemaItem[] = menus.map((menu) => ({
		name: menu.name,
		url: `${METADATA_CONFIG.site.url}/menus/${menu.id}`,
		description: `${menu.totalDishes} страв, ${menu.totalCalories} ккал`,
	}));
	useItemListSchema(menuItems, 'MenuItem');

	const tabs = MENU_TABS.map((tab) => ({
		...tab,
		disabled:
			!loading &&
			((tab.value === 'my' && menus.length === 0) ||
				tab.value === 'shared'), // TODO: shared menus not yet implemented
	}));

	const { activeTab, setActiveTab, isReady } = useTabsWithAutoSwitch({
		tabs,
		defaultTab: 'my',
		isLoading: loading,
	});

	return (
		<div className="container mx-auto px-4 py-8">
			<Breadcrumb items={breadcrumbItems} />
			<MetaData
				title={METADATA_CONFIG.titles.menus}
				description={METADATA_CONFIG.descriptions.menus}
				keywords={METADATA_CONFIG.keywords.menus}
				type="website"
			/>

			<PageTitle
				title={PAGE_TITLE.menus.title}
				subtitle={PAGE_TITLE.menus.subtitle}
				buttonVisible={false}
			/>

			{!isReady ? (
				<>
					<div className="mb-6 inline-flex h-10 items-center gap-1 rounded-md bg-muted p-1">
						{MENU_TABS.map((tab) => (
							<SkeletonBody key={tab.value} className="h-7 w-24 rounded-sm" />
						))}
					</div>
					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
							<MenuCardSkeleton key={i} />
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
							{tab.value === tabs[0].value && <SavedMenus />}
							{tab.value === tabs[1].value && (
								<div className="flex flex-col items-center justify-center py-12 text-center">
									<p className="text-muted-foreground">
										Функція shared меню буде доступна незабаром
									</p>
								</div>
							)}
						</TabsContent>
					))}
				</Tabs>
			)}
		</div>
	);
};

export default Menus;
