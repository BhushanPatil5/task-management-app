import React, { useState, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSortResult } from "../redux/actions/taskActions";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import TaskTable from "../components/TaskTable";
import SearchBar from "../components/SearchBar";
import SortDropdown from "../components/SortDropdown";
import SearchResultsList from "../components/SearchResultsList";

const TaskPage = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const searchResult = useSelector((state) => state.tasks.searchResult);
  const searchQuery = useSelector((state) => state.tasks.searchQuery);
  const loadingSearch = useSelector((state) => state.tasks.loadingSearch);
  const [selectedTask, setSelectedTask] = useState(null);

  const tasksResult = useMemo(
    () => (searchQuery ? searchResult : tasks),
    [searchQuery, searchResult, tasks]
  );

  const handleSortDropDown = useCallback(
    (sortedTasks) => {
      dispatch(setSortResult(sortedTasks));
    },
    [dispatch]
  );

  const onEditButtonClick = useCallback((task) => {
    if (task) {
      window.scroll({ top: 0, behavior: "smooth" });
    } else {
      window.scroll({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }

    setSelectedTask(task);
  }, []);

  return (
    <div className="row">
      <TaskForm
        selectedTask={selectedTask}
        onEditButtonClick={onEditButtonClick}
      />
      <div className="filter-task">
        <div className="search-bar-container">
          <SearchBar />
          {loadingSearch && <h3 className="loading-text">Searching...</h3>}
          {searchResult && searchResult.length > 0 && (
            <SearchResultsList results={searchResult} />
          )}
        </div>
        <SortDropdown
          tasks={tasksResult}
          handleSortDropDown={handleSortDropDown}
        />
      </div>
      <TaskList tasks={tasksResult} />
      <TaskTable onEditButtonClick={onEditButtonClick} tasks={tasksResult} />
    </div>
  );
};

export default TaskPage;
