import React, { memo } from "react";
import PropTypes from "prop-types";

const TaskList = ({ tasks = [] }) => {
  return (
    <>
      <h2>Task List</h2>

      <div className="task-list">
        {tasks.map((task) => (
          <div key={task.id} className="task-item">
            <div className="task-name"> Name: {task.name}</div>
            <div className="task-description">
              {" "}
              Description: {task.description}
            </div>
            <div className="task-category"> Category: {task.category}</div>
            <div className="task-date">
              {" "}
              Date:{" "}
              {new Intl.DateTimeFormat("en-US", {
                dateStyle: "full",
              }).format(Date.now(task.date))}
            </div>
            <div
              style={{
                color: task.status === "completed" ? "#10f110" : "red",
                marginTop: 5,
                fontSize: "12px",
              }}
            >
              {" "}
              {task.status}{" "}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      date: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default memo(TaskList);
