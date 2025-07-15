import React from 'react';

const ChevronLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPaginationNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`pagination-number ${currentPage === i ? 'pagination-number-active' : ''}`}
          >
            {i}
          </button>
        );
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(
            <button
              key={i}
              onClick={() => onPageChange(i)}
              className={`pagination-number ${currentPage === i ? 'pagination-number-active' : ''}`}
            >
              {i}
            </button>
          );
        }
        pages.push(<span key="ellipsis1" className="pagination-ellipsis">...</span>);
        pages.push(
          <button key={totalPages} onClick={() => onPageChange(totalPages)} className="pagination-number">
            {totalPages}
          </button>
        );
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          <button key={1} onClick={() => onPageChange(1)} className="pagination-number">
            1
          </button>
        );
        pages.push(<span key="ellipsis2" className="pagination-ellipsis">...</span>);
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(
            <button
              key={i}
              onClick={() => onPageChange(i)}
              className={`pagination-number ${currentPage === i ? 'pagination-number-active' : ''}`}
            >
              {i}
            </button>
          );
        }
      } else {
        pages.push(
          <button key={1} onClick={() => onPageChange(1)} className="pagination-number">
            1
          </button>
        );
        pages.push(<span key="ellipsis3" className="pagination-ellipsis">...</span>);
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(
            <button
              key={i}
              onClick={() => onPageChange(i)}
              className={`pagination-number ${currentPage === i ? 'pagination-number-active' : ''}`}
            >
              {i}
            </button>
          );
        }
        pages.push(<span key="ellipsis4" className="pagination-ellipsis">...</span>);
        pages.push(
          <button key={totalPages} onClick={() => onPageChange(totalPages)} className="pagination-number">
            {totalPages}
          </button>
        );
      }
    }

    return pages;
  };

  return (
    <div className="pagination-container">
      <div className="pagination">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="pagination-arrow"
          disabled={currentPage === 1}
        >
          <ChevronLeftIcon />
        </button>
        <div className="pagination-numbers">{renderPaginationNumbers()}</div>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="pagination-arrow"
          disabled={currentPage === totalPages}
        >
          <ChevronRightIcon />
        </button>
      </div>
      <div className="pagination-info">
        Página {currentPage} de {totalPages}
      </div>
    </div>
  );
};

export default Pagination;