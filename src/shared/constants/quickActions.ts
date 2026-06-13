import type { IconType } from 'react-icons';
import {
	PiCarrotBold as Apple,
	PiCalendarBlankBold as Calendar,
	PiNotePencilBold as NotebookPen,
	PiBowlFoodBold as Soup,
} from 'react-icons/pi';

export interface QuickAction {
	title: string;
	description: string;
	icon: IconType;
	link: string;
	color: string;
}

export const QUICK_ACTIONS: QuickAction[] = [
	{
		title: 'Моє меню',
		description: 'Плануйте харчування на тиждень',
		icon: NotebookPen,
		link: '/menu-planner',
		color: 'text-primary',
	},
	{
		title: 'Продукти',
		description: 'Вивчайте калорійність і КБЖУ',
		icon: Apple,
		link: '/products',
		color: 'text-secondary',
	},
	{
		title: 'Страви',
		description: 'Додавайте улюблені рецепти',
		icon: Soup,
		link: '/dishes',
		color: 'text-accent',
	},
	{
		title: 'Розклад',
		description: 'Переглядайте план харчування',
		icon: Calendar,
		link: '/schedule',
		color: 'text-primary',
	},
];
