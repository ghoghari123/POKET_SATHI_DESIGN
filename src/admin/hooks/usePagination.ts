import { useState, useCallback, useMemo } from 'react';

interface UsePaginationProps<T> {
  items: T[];
  pageSize?: number;
}

interface UsePaginationReturn<T> {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  paginatedItems: T[];
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  goToNext: () => void;
  goToPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

export function usePagination<T>({
  items,
  pageSize: initialPageSize = 10,
}: UsePaginationProps<T>): UsePaginationReturn<T> {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(initialPageSize);

  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / currentPageSize);

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * currentPageSize;
    return items.slice(startIndex, startIndex + currentPageSize);
  }, [items, currentPage, currentPageSize]);

  const setPage = useCallback((page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  }, [totalPages]);

  const handleSetPageSize = useCallback((size: number) => {
    setCurrentPageSize(size);
    setCurrentPage(1);
  }, []);

  const goToNext = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const goToPrevious = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }, []);

  return {
    currentPage,
    pageSize: currentPageSize,
    totalPages,
    totalItems,
    paginatedItems,
    setPage,
    setPageSize: handleSetPageSize,
    goToNext,
    goToPrevious,
    canGoNext: currentPage < totalPages,
    canGoPrevious: currentPage > 1,
  };
}