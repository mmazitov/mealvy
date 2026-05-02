import { useMemo, useState } from 'react';
import dayjs from 'dayjs';

import { useSavedMenuQuery } from '@/shared/api/graphql';
import { weekDays } from '@/shared/lib/utils';

export const useMenuDetail = (menuId: string) => {
	const { data, loading, error } = useSavedMenuQuery({
		variables: { id: menuId },
		skip: !menuId,
	});

	const menu = data?.savedMenu;

	const dishesByDay = useMemo(() => {
		if (!menu?.items) return {};

		const grouped: Record<string, typeof menu.items> = {};

		menu.items.forEach((item) => {
			const timestamp = Number(item.date);
			const finalDate = isNaN(timestamp) ? item.date : timestamp;
			const dayName = weekDays[dayjs(finalDate).isoWeekday() - 1];

			if (!grouped[dayName]) {
				grouped[dayName] = [];
			}
			grouped[dayName].push(item);
		});

		return grouped;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [menu?.items]);

	const weekDaysForFilter = useMemo(() => {
		return weekDays.map((day: string) => ({
			id: day,
			name: day,
			disabled: !dishesByDay[day] || dishesByDay[day].length === 0,
		}));
	}, [dishesByDay]);

	const firstAvailableDay = useMemo(() => {
		return (
			weekDaysForFilter.find(
				(day: { disabled?: boolean; name: string }) => !day.disabled,
			)?.name || weekDays[0]
		);
	}, [weekDaysForFilter]);

	const [selectedDay, setSelectedDay] = useState(firstAvailableDay);

	const currentDayDishes = useMemo(() => {
		return dishesByDay[selectedDay] || [];
	}, [dishesByDay, selectedDay]);

	const dishesForGrid = useMemo(() => {
		const uniqueDishes = new Map();

		currentDayDishes.forEach((item) => {
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

	const getWeekLabelFromNumber = (weekNum: number) => {
		if (weekNum === 0) return 'Поточний тиждень';
		if (weekNum > 0) return `Тиждень +${weekNum}`;
		return `Тиждень ${weekNum}`;
	};

	const breadcrumbItems = menu
		? [
				{ name: 'Головна', url: '/' },
				{ name: 'Меню', url: '/menus' },
				{ name: menu.name, url: `/menus/${menu.id}` },
			]
		: [];

	return {
		menu,
		loading,
		error,
		selectedDay,
		setSelectedDay,
		weekDaysForFilter,
		dishesForGrid,
		getWeekLabelFromNumber,
		breadcrumbItems,
	};
};
