import { useParams } from 'react-router-dom';

import { useAuthContext } from '@/features/auth';
import { CardFull } from '@/features/products';
import { useProductByNameQuery } from '@/shared/api/graphql';
import {
	Breadcrumb,
	Loader,
	MetaData,
	SchemaOrg,
} from '@/shared/components';
import { useBreadcrumbs } from '@/shared/hooks';
import { fromSlug } from '@/shared/lib/utils/slug';
import { generateProductSchema } from '@/shared/lib/utils/schemaOrg';

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

	const productSchema = generateProductSchema({
		name: product.name,
		description:
			product.description ||
			`Продукт ${product.name} з детальною поживною інформацією`,
		image: product.imageUrl ?? 'https://mealvy.vercel.app/icon-512.png',
		brand: 'Mealvy',
		calories: product.calories ?? 0,
		protein: product.protein ?? 0,
		fat: product.fat ?? 0,
		carbs: product.carbs ?? 0,
	});

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
			<SchemaOrg schema={productSchema} />
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
