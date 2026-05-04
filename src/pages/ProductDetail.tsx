import { useParams } from 'react-router-dom';

import { useAuthContext } from '@/features/auth';
import { CardFull } from '@/features/products';
import { useProductByNameQuery } from '@/shared/api/graphql';
import { Breadcrumb, Loader, MetaData } from '@/shared/components';
import { useBreadcrumbs, useProductSchema } from '@/shared/hooks';
import { fromSlug } from '@/shared/lib/utils/slug';

const ProductDetail = () => {
	const { isAdmin, user } = useAuthContext();
	const { id } = useParams<{ id: string }>();
	const productName = id ? fromSlug(id) : '';

	const { data, loading, error } = useProductByNameQuery({
		variables: { name: productName },
		skip: !productName,
	});

	const product = data?.productByName ?? null;
	const breadcrumbItems = useBreadcrumbs({
		title: loading ? undefined : (product?.name ?? undefined),
	});
	useProductSchema(product);

	if (loading) return <Loader />;

	if (error || !product) {
		return (
			<div className="container mx-auto px-4 py-8">
				<div className="rounded-lg bg-red-50 p-4 text-red-600">
					Продукт не знайдено
				</div>
			</div>
		);
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
