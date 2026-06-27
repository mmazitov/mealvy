import { useEffect, useMemo, useState } from 'react';

interface UseServerPaginationOptions {
	itemsPerPage?: number;
	resetKey?: string | number;
}

interface UseServerPaginationReturn {
	currentPage: number;
	offset: number;
	limit: number;
	handlePageChange: (page: number) => void;
}

export const useServerPagination = ({
	itemsPerPage = 10,
	resetKey,
}: UseServerPaginationOptions = {}): UseServerPaginationReturn => {
	const [currentPage, setCurrentPage] = useState<number>(1);

	useEffect(() => {
		setCurrentPage(1);
	}, [resetKey]);

	const offset = useMemo(
		() => (currentPage - 1) * itemsPerPage,
		[currentPage, itemsPerPage],
	);

	const handlePageChange = (page: number): void => {
		setCurrentPage(page);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	return {
		currentPage,
		offset,
		limit: itemsPerPage,
		handlePageChange,
	};
};
