import { useParams } from 'react-router-dom';

import { useAuthContext } from '@/features/auth';
import { CardFull } from '@/features/products';
import { useProductQuery } from '@/shared/api/graphql';
import { Breadcrumb, ErrorState, Loader, MetaData } from '@/shared/components';
import { useBreadcrumbs, useProductSchema } from '@/shared/hooks';
import { extractId } from '@/shared/lib/utils/slug';

const ProductDetail = () => {
	const { isAdmin, user } = useAuthContext();
	const { id } = useParams<{ id: string }>();
	const productId = id ? extractId(id) : '';

	const { data, loading, error } = useProductQuery({
		variables: { id: productId },
		skip: !productId,
	});

	const product = data?.product ?? null;
	const breadcrumbItems = useBreadcrumbs({
		title: loading ? undefined : (product?.name ?? undefined),
	});
	useProductSchema(product);

	if (loading) return <Loader />;

	if (error || !product) {
		return <ErrorState message="Продукт не знайдено" />;
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<MetaData
				title={product.name}
				description={product.description || `Продукт ${product.name}`}
				keywords={[
					'продукт',
					'харчування',
					'калорії',
					product.name,
					product.category || 'їжа',
				]}
				type="product"
			/>
			<Breadcrumb items={breadcrumbItems} />
			<CardFull
				id={product.id}
				name={product.name}
				description={product.description}
				category={product.category}
				imageUrl={product.imageUrl}
				calories={product.calories}
				protein={product.protein}
				fat={product.fat}
				carbs={product.carbs}
				isAdmin={isAdmin}
				userId={product.userId}
				currentUserId={user?.id}
				isFavorite={product.isFavorite}
			/>
		</div>
	);
};

export default ProductDetail;
