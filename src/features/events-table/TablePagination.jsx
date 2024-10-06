import { useSearchParams } from 'react-router-dom';
import { useEvents } from '../../contexts/EventsContext';
import { API_PAGE_SIZE, MAX_API_PAGE_LIMIT } from '../../contants';

import styles from './TablePagination.module.css';

function TablePagination() {
  const { totalPages, totalElements } = useEvents();
  const [searchParams, setSearchParams] = useSearchParams();
  const existingParams = new URLSearchParams(searchParams);

  const maxPagesToShow = 5;
  const currentPage = Math.min(parseInt(searchParams.get('page')) || 1, MAX_API_PAGE_LIMIT);
  const hardPageLimit = Math.min(totalPages, MAX_API_PAGE_LIMIT);

  const halfRange = Math.floor(maxPagesToShow / 2);
  let startPage = Math.max(currentPage - halfRange, 1);
  let endPage = Math.min(currentPage + halfRange, hardPageLimit);

  if (currentPage <= halfRange) {
    endPage = Math.min(maxPagesToShow, hardPageLimit);
  } else if (currentPage + halfRange >= hardPageLimit) {
    startPage = Math.max(hardPageLimit - maxPagesToShow + 1, 1);
  }

  const pagesToShow = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  function handlePageSelect(page) {
    existingParams.set('page', page);
    setSearchParams(existingParams);
  }

  function handlePreviousPage() {
    const previousPageNum = Math.max(currentPage - 1, 1);
    existingParams.set('page', previousPageNum);
    setSearchParams(existingParams);
  }

  function handleNextPage() {
    const nextPageNum = Math.min(currentPage + 1, totalPages);
    existingParams.set('page', nextPageNum);
    setSearchParams(existingParams);
  }

  return (
    <tfoot className={styles.tableFooter}>
      <tr>
        <td colSpan={7}>
          <div className={styles.paginationContainer}>
            <span>
              Showing {10 * (currentPage - 1) || 1} to {10 * (currentPage - 1) + API_PAGE_SIZE} of {totalElements} items
              ({Math.min(totalPages, MAX_API_PAGE_LIMIT)} pages total)
            </span>

            <div>
              <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                Back
              </button>
              {pagesToShow.map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageSelect(page)}
                  className={page === currentPage ? styles.active : null}
                >
                  {page}
                </button>
              ))}
              <button onClick={handleNextPage} disabled={currentPage === hardPageLimit}>
                Next
              </button>
            </div>
          </div>
        </td>
      </tr>
    </tfoot>
  );
}

export default TablePagination;
