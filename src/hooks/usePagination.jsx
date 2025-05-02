import { useState, useMemo } from "react";

const usePagination = (data, itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);

  const maxPage = useMemo(() => Math.ceil(data.length / itemsPerPage), [data, itemsPerPage]);

  const currentData = useMemo(() => {
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return data.slice(begin, end);
  }, [currentPage, itemsPerPage, data]);

  const next = () => setCurrentPage((page) => Math.min(page + 1, maxPage));
  const prev = () => setCurrentPage((page) => Math.max(page - 1, 1));
  const jump = (page) => setCurrentPage(() => Math.min(Math.max(page, 1), maxPage));

  return { currentData, currentPage, maxPage, next, prev, jump, setCurrentPage };
};

export default usePagination;
