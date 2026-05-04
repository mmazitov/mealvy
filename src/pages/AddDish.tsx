import { useParams } from 'react-router-dom';

import { DishForm } from '@/features/dishes';
import { useDishByNameQuery, useProductsQuery } from '@/shared/api/graphql';
import {
	Breadcrumb,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Loader,
	MetaData,
} from '@/shared/components';
import { METADATA_CONFIG } from '@/shared/lib/config';
import { fromSlug } from '@/shared/lib/utils/slug';
import { useBreadcrumbs } from '@/shared/hooks';

const AddDish = () => {
	const breadcrumbItems = useBreadcrumbs();
	const { id } = useParams<{ id: string }>();
	const isEditMode = !!id;
	const dishName = id ? fromSlug(id) : '';

	const { data: dishData, loading: dishLoading } = useDishByNameQuery({
		variables: { name: dishName },
		skip: !dishName,
	});

	const { data: productsData, loading: productsLoading } = useProductsQuery();

	const isLoading = (dishLoading && isEditMode) || productsLoading;

	if (isLoading) {
		return <Loader />;
	}

	const dish = dishData?.dishByName;
	const products = productsData?.products || [];

	return (
		<div className="container mx-auto max-w-4xl px-4 py-8">
			<MetaData
				title={
					isEditMode
						? METADATA_CONFIG.titles.editDish + ' ' + dish?.name
						: METADATA_CONFIG.titles.addDish
				}
				description={
					isEditMode
						? METADATA_CONFIG.descriptions.editDish + ' ' + dish?.name
						: METADATA_CONFIG.descriptions.addDish
				}
				keywords={METADATA_CONFIG.keywords.dishes}
				type="website"
			/>
			<Breadcrumb items={breadcrumbItems} />

			<Card>
				<CardHeader>
					<CardTitle className="text-3xl">
						{isEditMode ? 'Редагувати страву' : 'Додати нову страву'}
					</CardTitle>
				</CardHeader>
				<CardContent>
					<DishForm dish={dish} products={products} isEditMode={isEditMode} />
				</CardContent>
			</Card>
		</div>
	);
};

export default AddDish;
