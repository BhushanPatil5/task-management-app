import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery, setSearchReult } from "../redux/actions/taskActions";
import { sanitize } from "../util";
import { FaSearch } from "react-icons/fa";

import "./SearchBar.css";

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.tasks.searchQuery);
  const tasks = useSelector((state) => state.tasks.tasks);

  const filteredTasks = useMemo(() => {
    return (
      tasks.length > 0 &&
      tasks.filter((task) => {
        const taskNameMatch = task.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const taskDescriptionMatch = task.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

        // Check for exact matches within double quotes
        if (searchQuery.startsWith('"') && searchQuery.endsWith('"')) {
          const exactMatchPhrase = searchQuery.slice(1, -1).toLowerCase();
          return (
            (taskNameMatch &&
              task.description.toLowerCase() === exactMatchPhrase) ||
            (taskDescriptionMatch &&
              task.name.toLowerCase() === exactMatchPhrase)
          );
        }

        return taskNameMatch || taskDescriptionMatch;
      })
    );
  }, [searchQuery, tasks]);

  const handleChange = (searchtext) => {
    dispatch(setSearchQuery(sanitize(searchtext)));
    if (searchtext) {
      dispatch(setSearchReult(filteredTasks));
    } else {
      dispatch(setSearchReult([]));
    }
  };

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        placeholder="Type to search..."
        value={searchQuery}
        autoComplete="on"
        type="search"
        id="search"
        name="search"
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
