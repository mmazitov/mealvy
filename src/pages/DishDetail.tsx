import { useParams } from 'react-router-dom';

import { useAuthContext } from '@/features/auth';
import { CardFull } from '@/features/dishes';
import { useDishByNameQuery } from '@/shared/api/graphql';
import { Breadcrumb, ErrorState, Loader, MetaData } from '@/shared/components';
import { useBreadcrumbs, useRecipeSchema } from '@/shared/hooks';
import { fromSlug } from '@/shared/lib/utils/slug';

const DishDetail = () => {
	const { isAdmin, user } = useAuthContext();
	const { id } = useParams<{ id: string }>();
	const dishName = id ? fromSlug(id) : '';

	const { data, loading, error } = useDishByNameQuery({
		variables: { name: dishName },
		skip: !dishName,
	});

	const dish = data?.dishByName ?? null;
	const breadcrumbItems = useBreadcrumbs({
		title: loading ? undefined : (dish?.name ?? undefined),
	});
	useRecipeSchema(dish);

	if (loading) return <Loader />;

	if (error) {
		console.error('[DishDetail] Failed to load dish:', id, error.message);
		return (
			<ErrorState message="Не вдалося завантажити страву. Спробуйте оновити сторінку." />
		);
	}

	if (!dish) {
		return <ErrorState message="Страву не знайдено" />;
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<MetaData
				title={dish.name}
				description={dish.description ?? ''}
				keywords={[
					'рецепт',
					'страва',
					'готування',
					dish.name,
					dish.category ?? '',
				]}
				type="article"
			/>
			<Breadcrumb items={breadcrumbItems} />
			<CardFull
				id={dish.id}
				name={dish.name}
				description={dish.description}
				category={dish.category}
				imageUrl={dish.imageUrl}
				prepTime={dish.prepTime}
				servings={dish.servings}
				calories={dish.calories}
				protein={dish.protein}
				fat={dish.fat}
				carbs={dish.carbs}
				ingredients={dish.ingredients}
				instructions={dish.instructions}
				isAdmin={isAdmin}
				userId={dish.userId}
				currentUserId={user?.id}
				isFavorite={dish.isFavorite}
			/>
		</div>
	);
};

export default DishDetail;
