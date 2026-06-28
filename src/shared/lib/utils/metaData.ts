export const truncateDescription = (
	text: string,
	maxLength: number = 160,
): string => {
	if (!text) return '';
	if (text.length <= maxLength) return text;
	return text.substring(0, maxLength - 3).trim() + '...';
};

export const capitalizeFirstLetter = (string: string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

export const defaultCanonicalUrl = (): string =>
	typeof window !== 'undefined'
		? window.location.origin + window.location.pathname
		: '';
