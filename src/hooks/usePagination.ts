import { useState } from "react";
const PAGE_SIZE = 18;

export function usePagination<T>(data: T[]) {
  const [pageIndex, setPageIndex] = useState(1);

  function handleNext() {
    setPageIndex(pageIndex + 1);
  }

  function handlePrevious() {
    setPageIndex(pageIndex - 1);
  }

  return {
    nextDisabled: (Math.ceil(data.length / PAGE_SIZE)) === pageIndex,
    handleNext,
    handlePrevious,
    pageIndex,
    pageSize: PAGE_SIZE,
    data: data.slice((pageIndex - 1) * PAGE_SIZE, pageIndex * PAGE_SIZE)
  }

}