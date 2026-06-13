import type { IconType } from 'react-icons';
import {
	PiCarrotBold as Apple,
	PiCalendarBlankBold as Calendar,
	PiChefHatBold as ChefHat,
	PiNotePencilBold as NotebookPen,
	PiBowlFoodBold as Soup,
} from 'react-icons/pi';

export interface NavigationItem {
	name: string;
	href: string;
	icon: IconType;
}

export const NAVIGATION_ITEMS: NavigationItem[] = [
	{
		name: 'Головна',
		href: '/',
		icon: ChefHat,
	},
	{
		name: 'Розклад',
		href: '/schedule',
		icon: Calendar,
	},
	{
		name: 'Планувальник',
		href: '/menu-planner',
		icon: NotebookPen,
	},
	{
		name: 'Страви',
		href: '/dishes',
		icon: Soup,
	},
	{
		name: 'Продукти',
		href: '/products',
		icon: Apple,
	},
] as const;
