import React, { useState, useEffect, memo } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { addTask, editTask } from "../redux/actions/taskActions";
import { uuid, sanitize } from "../util";

const initialValues = {
  name: "",
  description: "",
  category: "",
  status: "",
};

const TaskForm = ({ selectedTask, onEditButtonClick }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.tasks.loading);
  const categories = useSelector((state) => state.categories.categories);

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    category: "",
    status: "",
  });

  const [values, setValues] = useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: sanitize(value),
    });
  };

  useEffect(() => {
    if (selectedTask) {
      setValues(selectedTask);
    }
  }, [selectedTask]);

  const validateForm = () => {
    const newErrors = {};

    if (!values.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!values.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!values.category.trim()) {
      newErrors.category = "Category is required";
    }

    if (!values.status.trim()) {
      newErrors.status = "Status is required";
    }

    setErrors(newErrors);

    // Return true if there are no errors
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form before dispatching the action
    if (!validateForm()) {
      return;
    }

    const task = {
      name: values.name,
      description: values.description,
      category: values.category,
      status: values.status,
      date: Date.now(),
      id: uuid(),
    };

    try {
      if (selectedTask) {
        // If editing, dispatch the editTask action
        const response = await dispatch(editTask(selectedTask.id, task));
        console.log(response);
      } else {
        // If adding, dispatch the addTask action
        const response = await dispatch(addTask(task));
        console.log(response);
      }
    } catch (error) {
      console.error(error.message);
    }

    // Clear the form fields after submission
    setValues(initialValues);
    onEditButtonClick(null);
  };

  return (
    <div className="task-form">
      <h2>{selectedTask ? "Edit Task" : "Add Task"}</h2>
      <form onSubmit={handleSubmit}>
        <span className="error">{errors.invalid}</span>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={values.name}
            onChange={handleInputChange}
            required
          />
          <span className="error">{errors.name}</span>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            cols="50"
            value={values.description}
            onChange={handleInputChange}
            required
          ></textarea>
          <span className="error">{errors.description}</span>
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={values.category}
            onChange={handleInputChange}
          >
            <option value="">Select Category</option>
            {categories.map((category) => {
              return (
                <option key={category.name} value="completed">
                  {category.name}
                </option>
              );
            })}
          </select>
          <span className="error">{errors.category}</span>
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={values.status}
            onChange={handleInputChange}
          >
            <option value="">Select Status</option>
            <option value="completed">Completed</option>
            <option value="not completed">Not Completed</option>
          </select>
          <span className="error">{errors.status}</span>
        </div>
        <div className="form-group center">
          <button
            className="button primary"
            onClick={handleSubmit}
            type="submit"
          >
            {loading ? "Processing..." : selectedTask ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

TaskForm.propTypes = {
  selectedTask: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.number.isRequired,
  }),
  onEditButtonClick: PropTypes.func.isRequired,
};

export default memo(TaskForm);
