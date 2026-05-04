import { useParams } from 'react-router-dom';

import { ProductForm } from '@/features/products';
import { useProductByNameQuery } from '@/shared/api/graphql';
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

const AddProduct = () => {
	const breadcrumbItems = useBreadcrumbs();
	const { id } = useParams<{ id: string }>();
	const isEditMode = !!id;
	const productName = id ? fromSlug(id) : '';

	const { data, loading } = useProductByNameQuery({
		variables: { name: productName },
		skip: !productName,
	});

	if (loading && isEditMode) {
		return <Loader />;
	}

	const product = data?.productByName;

	return (
		<div className="container mx-auto max-w-3xl px-4 py-8">
			<MetaData
				title={
					isEditMode
						? METADATA_CONFIG.titles.editProduct + ' ' + product?.name
						: METADATA_CONFIG.titles.addProduct
				}
				description={
					isEditMode
						? METADATA_CONFIG.descriptions.editProduct + ' ' + product?.name
						: METADATA_CONFIG.descriptions.addProduct
				}
				keywords={METADATA_CONFIG.keywords.products}
				type="website"
			/>
			<Breadcrumb items={breadcrumbItems} />

			<Card>
				<CardHeader>
					<CardTitle className="text-3xl">
						{isEditMode ? 'Редагувати продукт' : 'Додати новий продукт'}
					</CardTitle>
				</CardHeader>
				<CardContent>
					<ProductForm product={product} isEditMode={isEditMode} />
				</CardContent>
			</Card>
		</div>
	);
};

export default AddProduct;
