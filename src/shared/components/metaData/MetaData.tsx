import { Link, Meta, Title } from 'react-head';

import { METADATA_CONFIG } from '@/shared/lib/config';
import {
	capitalizeFirstLetter,
	defaultCanonicalUrl,
	truncateDescription,
} from '@/shared/lib/utils';

interface MetaDataProps {
	title: string;
	description: string;
	image?: string;
	url?: string;
	type?: 'website' | 'article' | 'product';
	author?: string;
	keywords?: readonly string[];
	/** Pages behind auth must not be indexed by search engines */
	noindex?: boolean;
}

const EMPTY_KEYWORDS: readonly string[] = [];

export const MetaData = ({
	title,
	description,
	image = METADATA_CONFIG.site.image,
	url = defaultCanonicalUrl(),
	type = 'website',
	author,
	keywords = EMPTY_KEYWORDS,
	noindex = false,
}: MetaDataProps) => {
	const siteTitle = 'Mealvy';
	const fullTitle = title
		? `${capitalizeFirstLetter(title)} | ${siteTitle}`
		: siteTitle;
	const truncatedDescription = truncateDescription(description);

	return (
		<>
			<Title>{fullTitle}</Title>
			<Meta name="description" content={truncatedDescription} />
			<Meta name="keywords" content={keywords.join(', ')} />
			{author && <Meta name="author" content={author} />}

			<Meta property="og:title" content={fullTitle} />
			<Meta property="og:description" content={truncatedDescription} />
			<Meta property="og:type" content={type} />
			<Meta property="og:url" content={url} />
			<Meta property="og:image" content={image} />
			<Meta property="og:site_name" content="Mealvy" />

			<Meta name="twitter:card" content="summary_large_image" />
			<Meta name="twitter:title" content={fullTitle} />
			<Meta name="twitter:description" content={truncatedDescription} />
			<Meta name="twitter:image" content={image} />

			<Link rel="canonical" href={url} />

			<Meta
				name="robots"
				content={noindex ? 'noindex, nofollow' : 'index, follow'}
			/>
			<Meta name="language" content="Ukrainian" />
		</>
	);
};

export default MetaData;
