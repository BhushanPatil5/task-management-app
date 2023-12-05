import React, { memo } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { setSortBy } from "../redux/actions/taskActions";

const SortDropdown = ({ tasks, handleSortDropDown }) => {
  const dispatch = useDispatch();
  const sortBy = useSelector((state) => state.tasks.sortBy);
  const loadingSort = useSelector((state) => state.tasks.loadingSort);

  const handleSort = (newSortBy) => {
    dispatch(setSortBy(newSortBy));

    const sortedTasks = [...tasks].sort((a, b) => {
      switch (newSortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "category":
          return a.category.localeCompare(b.category);
        case "date":
          return new Date(b.date) - new Date(a.date);
        default:
          return 0;
      }
    });

    handleSortDropDown(sortedTasks);
  };

  return (
    <div className="sort-dropdown">
      <select
        id="sort"
        value={sortBy}
        onChange={(e) => handleSort(e.target.value)}
      >
        <option value="">Select</option>
        <option value="name">Name</option>
        <option value="category">Category</option>
        <option value="date">Date Last Edited</option>
      </select>
      {<h3 className="loading-text">{loadingSort ? "Sorting..." : ""}</h3>}
    </div>
  );
};

SortDropdown.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      date: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default memo(SortDropdown);
