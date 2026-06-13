import { Link } from 'react-router-dom';

import { MetaData } from '@/shared/components/metaData';
import { METADATA_CONFIG } from '@/shared/lib/config/metaDataConfig';

const NotFound = () => {
	return (
		<div className="bg-background flex min-h-screen items-center justify-center">
			<MetaData
				noindex
				title={METADATA_CONFIG.titles.notFound}
				description={METADATA_CONFIG.descriptions.notFound}
				keywords={METADATA_CONFIG.keywords.notFound}
				type="website"
			/>
			<div className="text-center">
				<h1 className="mb-4 text-4xl font-bold">404</h1>
				<p className="text-muted-foreground mb-4 text-xl">
					Сторінка не знайдена
				</p>
				<Link
					to="/"
					className="text-primary underline-offset-4 hover:underline"
				>
					Повернутись на головну сторінку
				</Link>
			</div>
		</div>
	);
};

export default NotFound;
