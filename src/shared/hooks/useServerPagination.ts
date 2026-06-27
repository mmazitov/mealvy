import { useState } from 'react';

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
	const [prevResetKey, setPrevResetKey] = useState(resetKey);

	if (resetKey !== prevResetKey) {
		setPrevResetKey(resetKey);
		setCurrentPage(1);
	}

	const offset = (currentPage - 1) * itemsPerPage;

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
