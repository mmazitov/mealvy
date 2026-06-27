import { useParams } from 'react-router-dom';

import { ProductForm } from '@/features/products';
import { useProductQuery } from '@/shared/api/graphql';
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
import { extractId } from '@/shared/lib/utils/slug';
import { useBreadcrumbs } from '@/shared/hooks';

const AddProduct = () => {
	const breadcrumbItems = useBreadcrumbs();
	const { id } = useParams<{ id: string }>();
	const isEditMode = !!id;
	const productId = id ? extractId(id) : '';

	const { data, loading } = useProductQuery({
		variables: { id: productId },
		skip: !productId,
	});

	if (loading && isEditMode) {
		return <Loader />;
	}

	const product = data?.product;

	return (
		<div className="container mx-auto max-w-3xl px-4 py-8">
			<MetaData
				noindex
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
