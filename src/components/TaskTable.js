import React, { useMemo, memo } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask } from "../redux/actions/taskActions";
import Pagination from "./Pagination";

const TaskTable = ({ tasks, onEditButtonClick }) => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.tasks.currentPage);
  const loadingDelete = useSelector((state) => state.tasks.loadingDelete);
  const tasksPerPage = useSelector((state) => state.tasks.tasksPerPage);

  const currentTasks = useMemo(() => {
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    return [...tasks].slice(indexOfFirstTask, indexOfLastTask);
  }, [currentPage, tasksPerPage, tasks]);

  return (
    <>
      <div className="task-table">
        <h2>Task Table</h2>
        <h3 className="loading-text">{loadingDelete ? "Deleting..." : ""}</h3>
        <table>
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>Last Edited</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentTasks.map((task) => (
              <tr key={task.id}>
                <td>{task.name}</td>
                <td>{task.description}</td>
                <td>{task.category}</td>
                <td>
                  {new Intl.DateTimeFormat("en-US", {
                    dateStyle: "full",
                  }).format(Date.now(task.date))}
                </td>
                <td className="task-actions">
                  <button
                    className="button secondary"
                    onClick={() => onEditButtonClick(task)}
                  >
                    Edit
                  </button>
                  <button
                    className="button alert"
                    onClick={() => dispatch(deleteTask(task.id))}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination />
      </div>
    </>
  );
};

TaskTable.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      date: PropTypes.number.isRequired,
    })
  ).isRequired,
  onEditButtonClick: PropTypes.func.isRequired,
};

export default memo(TaskTable);
