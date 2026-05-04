import { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';

import { useSavedMenuQuery } from '@/shared/api/graphql';
import { weekDays } from '@/shared/lib/utils';

dayjs.extend(isoWeek);

interface DishGridItem {
	id: string;
	name: string;
	imageUrl: string | null | undefined;
	category: string | null | undefined;
	calories: number | null | undefined;
}

export const useMenuDetail = (menuId: string | undefined) => {
	const { data, loading, error } = useSavedMenuQuery({
		variables: { id: menuId ?? '' },
		skip: !menuId,
	});

	const menu = data?.savedMenu;

	const dishesByDay = useMemo(() => {
		if (!menu?.items) return {};

		const grouped: Record<string, typeof menu.items> = {};

		menu.items.forEach((item) => {
			const timestamp = Number(item.date);
			const finalDate = isNaN(timestamp) ? item.date : timestamp;

			const parsed = dayjs(finalDate);
			if (!parsed.isValid()) {
				console.error(
					'[useMenuDetail] Invalid date on menu item:',
					item.id,
					item.date,
				);
				return;
			}

			const dayName = weekDays[parsed.isoWeekday() - 1];
			if (!dayName) {
				console.error(
					'[useMenuDetail] Could not map date to weekday:',
					item.id,
					item.date,
				);
				return;
			}

			if (!grouped[dayName]) grouped[dayName] = [];
			grouped[dayName].push(item);
		});

		return grouped;
	}, [menu]);

	const weekDaysForFilter = useMemo(() => {
		return weekDays.map((day: string) => ({
			id: day,
			name: day,
		}));
	}, []);

	const [selectedDay, setSelectedDay] = useState<string>(weekDays[0] ?? '');

	const currentDayDishes = useMemo(() => {
		return dishesByDay[selectedDay] || [];
	}, [dishesByDay, selectedDay]);

	const dishesForGrid = useMemo(() => {
		const uniqueDishes = new Map<string, DishGridItem>();

		currentDayDishes.forEach((item) => {
			if (!item.dish) {
				console.error(
					'[useMenuDetail] Menu item missing dish reference:',
					item.id,
				);
				return;
			}
			if (!uniqueDishes.has(item.dishId)) {
				uniqueDishes.set(item.dishId, {
					id: item.dish.id,
					name: item.dish.name,
					imageUrl: item.dish.imageUrl,
					category: item.dish.category,
					calories: item.dish.calories,
				});
			}
		});

		return Array.from(uniqueDishes.values());
	}, [currentDayDishes]);

	return {
		menu,
		loading,
		error,
		selectedDay,
		setSelectedDay,
		weekDaysForFilter,
		dishesForGrid,
	};
};
