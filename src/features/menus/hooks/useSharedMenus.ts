import { useMemo } from 'react';

import { useSharedMenusQuery } from '@/shared/api/graphql';
import { getWeekDiff } from '@/shared/lib/utils';

export const useSharedMenus = () => {
	const { data, loading, error, refetch } = useSharedMenusQuery({
		fetchPolicy: 'cache-and-network',
	});

	const sortedMenus = useMemo(() => {
		if (!data?.sharedMenus) return [];

		return [...data.sharedMenus].sort((a, b) => {
			const diffA = Math.abs(getWeekDiff(a.startDate));
			const diffB = Math.abs(getWeekDiff(b.startDate));

			if (diffA === diffB) {
				const weekDiffA = getWeekDiff(a.startDate);
				const weekDiffB = getWeekDiff(b.startDate);
				return weekDiffB - weekDiffA;
			}

			return diffA - diffB;
		});
	}, [data?.sharedMenus]);

	return {
		menus: sortedMenus,
		loading,
		error,
		refetch,
	};
};
