import { Link, Meta, Title } from 'react-head';

import { METADATA_CONFIG } from '@/shared/lib/config';

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

const truncateDescription = (text: string, maxLength: number = 160): string => {
	if (!text) return '';
	if (text.length <= maxLength) return text;
	return text.substring(0, maxLength - 3).trim() + '...';
};

// Canonical must not include query params or fragments — search engines
// would treat every filter/pagination variant as a separate page
const defaultCanonicalUrl = (): string =>
	typeof window !== 'undefined'
		? window.location.origin + window.location.pathname
		: '';

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
	const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
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
