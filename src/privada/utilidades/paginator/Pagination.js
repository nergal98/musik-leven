import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  setCurrentPage,
  maxPageNums,
}) => {
  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / maxPageNums) * maxPageNums;
    let end = start + maxPageNums;
    if (end > totalPages) {
      end = totalPages;
      start = Math.max(0, end - maxPageNums);
    }
    return [...Array(end - start).keys()].map((i) => i + start + 1);
  };
  const firstGroup = getPaginationGroup()[0];
  const lastGroup = getPaginationGroup()[getPaginationGroup().length - 1];

  const paginationStartsFromSecondGroup = firstGroup > 1;
  const paginationEndsBeforeLastGroup = lastGroup < totalPages;

  const goToNextPage = () => {
    setCurrentPage(Math.min(currentPage + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage(Math.max(currentPage - 1, 1));
  };
  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  return (
    <div className="pagination">
      <button onClick={goToFirstPage} disabled={currentPage === 1}>
        Primero
      </button>
      <button onClick={goToPreviousPage} disabled={currentPage === 1}>
        Anterior
      </button>
      {paginationStartsFromSecondGroup && <span>...</span>}
      {getPaginationGroup().map((num) => (
        <button
          key={num}
          onClick={() => setCurrentPage(num)}
          className={currentPage === num ? "active" : ""}
        >
          {num}
        </button>
      ))}
      {paginationEndsBeforeLastGroup && <span>...</span>}
      <button onClick={goToNextPage} disabled={currentPage === totalPages}>
        Siguiente
      </button>
      <button onClick={goToLastPage} disabled={currentPage === totalPages}>
        Último
      </button>
    </div>
  );
};

export default Pagination;
