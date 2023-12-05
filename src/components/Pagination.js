import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../redux/actions/taskActions";

const Pagination = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.tasks.currentPage);
  const tasksPerPage = useSelector((state) => state.tasks.tasksPerPage);
  const tasks = useSelector((state) => state.tasks.tasks);

  const totalPages = useMemo(
    () => Math.ceil(tasks.length / tasksPerPage),
    [tasks.length, tasksPerPage]
  );

  const handlePageClick = (page) => {
    dispatch(setPage(page));
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(setPage(currentPage + 1));
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(setPage(currentPage - 1));
    }
  };

  return (
    <div className="pagination-container">
      <button
        className="pagination-button"
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      <div className="pagination-pages">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageClick(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <button
        className="pagination-button"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
