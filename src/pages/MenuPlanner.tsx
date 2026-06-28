import {
	PiCalendarDotBold as Calendar1,
	PiCalendarDotsBold as CalendarRange,
	PiListBulletsBold as List,
	PiFloppyDiskBold as Save,
} from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';

import {
	PlannerDay,
	PlannerWeek,
	ScheduleNavigation,
	useMenuPlanner,
} from '@/features/schedule';
import {
	Breadcrumb,
	ErrorState,
	FloatingMenu,
	MetaData,
	Modal,
	PageTitle,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/shared/components';
import { MODAL_TYPES, PAGE_TITLE } from '@/shared/constants';
import { useBreadcrumbs } from '@/shared/hooks';
import { METADATA_CONFIG } from '@/shared/lib/config';
import { FloatingMenuItem } from '@/shared/types';
import { useAuthContext } from '@/features/auth';
import { AuthRequiredNotice } from '@/features/auth/ui/AuthRequiredNotice';

const MenuPlanner = () => {
	const breadcrumbItems = useBreadcrumbs();
	const navigate = useNavigate();

	const { user } = useAuthContext();

	const {
		selectedDay,
		setSelectedDay,
		isDialogOpen,
		openDialog,
		closeDialog,
		selectedMeal,
		searchQuery,
		setSearchQuery,
		menuPlan,
		addDishToMenu,
		removeDishFromMenu,
		dailyStats,
		weeklyTotalCalories,
		weeklyTotalDishes,
		handleSave,
		weekDaysForFilter,
		mealTimes,
		schedule,
		isDirty,
		hasSavedData,
		isLoading,
		error,
	} = useMenuPlanner();

	const menuItems: FloatingMenuItem[] = [
		{
			icon: <Save />,
			label: 'Save menu',
			onClick: handleSave,
			disabled: isLoading || !isDirty,
		},
		{
			icon: <List />,
			label: 'Shopping list',
			onClick: () => navigate(`/shopping-list?week=${schedule.weekDiff}`),
			disabled: isLoading || isDirty || !hasSavedData,
		},
	];

	if (!user) {
		return <AuthRequiredNotice />;
	}

	if (error) {
		return (
			<ErrorState message="Не вдалося завантажити планувальник. Спробуйте оновити сторінку." />
		);
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<Breadcrumb items={breadcrumbItems} />
			<FloatingMenu
				position="bottom-right"
				items={menuItems}
				closeOnClick={false}
			/>

			<MetaData
				title={METADATA_CONFIG.titles.menu}
				description={METADATA_CONFIG.descriptions.menu}
				keywords={METADATA_CONFIG.keywords.menu}
				type="website"
			/>
			<PageTitle
				title={PAGE_TITLE.planer.title}
				subtitle={PAGE_TITLE.planer.subtitle}
				onClick={handleSave}
				buttonText={PAGE_TITLE.planer.button}
				buttonIcon={<Save />}
				buttonDisable={isLoading || !isDirty}
				buttonMobileVisible={false}
				secondaryButtonVisible={true}
				secondaryButtonText="Список продуктів"
				secondaryButtonIcon={<List />}
				secondaryButtonDisable={isLoading || isDirty || !hasSavedData}
				secondaryButtonOnClick={() =>
					navigate(`/shopping-list?week=${schedule.weekDiff}`)
				}
				secondaryButtonMobileVisible={false}
			/>
			<Tabs defaultValue="day" className="space-y-6">
				<TabsList className="grid w-full max-w-md grid-cols-2">
					<TabsTrigger value="day" className="flex gap-1">
						<Calendar1 className="h-4 w-4" />
						День
					</TabsTrigger>
					<TabsTrigger value="week" className="flex gap-1">
						<CalendarRange className="h-4 w-4" />
						Тиждень
					</TabsTrigger>
				</TabsList>

				<div className="mt-8 mb-6">
					<ScheduleNavigation
						todayWeek={schedule.todayWeek}
						weekDiff={schedule.weekDiff}
						handlePrevious={schedule.handlePrevious}
						handleNext={schedule.handleNext}
						handleReset={schedule.handleReset}
					/>
				</div>

				<TabsContent value="day" className="space-y-6">
					<PlannerDay
						selectedDay={selectedDay}
						setSelectedDay={setSelectedDay}
						weekDaysForFilter={weekDaysForFilter}
						mealTimes={mealTimes}
						menuPlan={menuPlan}
						dailyStats={dailyStats}
						openDialog={openDialog}
						removeDishFromMenu={removeDishFromMenu}
					/>
				</TabsContent>

				<TabsContent value="week" className="space-y-6">
					<PlannerWeek
						weekDaysForFilter={weekDaysForFilter}
						mealTimes={mealTimes}
						menuPlan={menuPlan}
						setSelectedDay={setSelectedDay}
						openDialog={openDialog}
						removeDishFromMenu={removeDishFromMenu}
						weeklyTotalCalories={weeklyTotalCalories}
						weeklyTotalDishes={weeklyTotalDishes}
					/>
				</TabsContent>
			</Tabs>

			<Modal
				modalType={MODAL_TYPES.ADD_DISH_MODAL}
				open={isDialogOpen}
				onOpenChange={(open) => (open ? null : closeDialog())}
				selectedMeal={selectedMeal}
				searchQuery={searchQuery}
				onSearchChange={setSearchQuery}
				onDishSelect={addDishToMenu}
			/>
		</div>
	);
};

export default MenuPlanner;
