import { useMemo } from 'react';
import { PiTrendUpBold as TrendingUp } from 'react-icons/pi';
import { Link } from 'react-router-dom';

import CardCompact from './cardCompact/CardCompact';

import { useDishesQuery } from '@/shared/api/graphql/dish.gen';
import { ErrorState } from '@/shared/components/errorState';
import { Grid } from '@/shared/components/grid';
import { Skeleton } from '@/shared/components/skeleton';
import { Button } from '@/shared/components/ui/button';

const FeaturedDishes = () => {
	const { data, loading, error } = useDishesQuery({
		variables: { limit: 20 },
	});

	const randomDishes = useMemo(() => {
		if (!data?.dishes) return [];
		return data.dishes.toSorted(() => 0.5 - Math.random()).slice(0, 5);
	}, [data?.dishes]);

	if (error) {
		return (
			<ErrorState message="Не вдалося завантажити страви. Спробуйте оновити сторінку." />
		);
	}

	return (
		<>
			<div className="mb-8 flex items-center justify-between">
				<div>
					<h2 className="text-foreground mb-2 text-3xl leading-tight font-bold tracking-tight">
						Популярні страви
					</h2>
					<p className="text-muted-foreground">
						Рекомендуємо страви для здорового харчування
					</p>
				</div>
				<Link to="/dishes">
					<Button variant="ghost" className="gap-2">
						Всі страви
						<TrendingUp className="h-4 w-4" />
					</Button>
				</Link>
			</div>

			<Grid
				items={randomDishes}
				itemComponent={CardCompact}
				showEmpty={false}
				isLoading={loading}
				skeletonComponent={Skeleton}
				skeletonCount={5}
			/>
		</>
	);
};

export default FeaturedDishes;
