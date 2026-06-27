import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/uk';
import isoWeek from 'dayjs/plugin/isoWeek';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';

dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(isoWeek);
dayjs.locale('uk');

export function formatDateToISO(date: Date | string): string {
	if (typeof date === 'string') {
		return date;
	}
	return date.toISOString().split('T')[0];
}

export function formatDayjsToISO(date: Dayjs): string {
	return date.format('YYYY-MM-DD');
}

function getToday(): string {
	return dayjs().format('D MMMM, YYYY');
}

function getWeekDays(): string[] {
	return Array.from({ length: 7 }, (_, i) =>
		dayjs()
			.isoWeekday(i + 1)
			.format('dd'),
	);
}

export function getWeekDiff(startDate: string): number {
	const weekStart = dayjs(startDate).startOf('isoWeek');
	const currentWeekStart = dayjs().startOf('isoWeek');
	return weekStart.diff(currentWeekStart, 'week');
}

export const today = getToday();
export const weekDays = getWeekDays();
