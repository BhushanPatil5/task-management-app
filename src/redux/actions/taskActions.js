export const addTask = (task) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "ADD_TASK_REQUEST" });
      await new Promise((res) => setTimeout(res, 2000));

      if (task) {
        dispatch({
          type: "ADD_TASK_SUCCESS",
          payload: task,
        });
        return "Task added successfully";
      } else {
        dispatch({ type: "ADD_TASK_FAILURE" });
        throw new Error("Error adding task");
      }
    } catch (error) {
      dispatch({ type: "ADD_TASK_FAILURE" });
      throw new Error("Error adding task");
    }
  };
};

export const editTask = (taskId, updatedTask) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "EDIT_TASK_REQUEST" });
      await new Promise((res) => setTimeout(res, 2000));

      if (taskId && updatedTask) {
        dispatch({
          type: "EDIT_TASK_SUCCESS",
          payload: { taskId, updatedTask },
        });
        return "Task edited successfully";
      } else {
        dispatch({ type: "EDIT_TASK_FAILURE" });
        throw new Error("Error editing task");
      }
    } catch (error) {
      dispatch({ type: "EDIT_TASK_FAILURE" });
      throw new Error("Error editing task");
    }
  };
};

export const deleteTask = (taskIdToDelete) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "DELETE_TASK_REQUEST" });
      await new Promise((res) => setTimeout(res, 2000));

      if (taskIdToDelete) {
        dispatch({
          type: "DELETE_TASK_SUCCESS",
          payload: { taskIdToDelete },
        });

        return "Task edited successfully";
      } else {
        dispatch({ type: "DELETE_TASK_FAILURE" });
        throw new Error("Error deleting task");
      }
    } catch (error) {
      dispatch({ type: "DELETE_TASK_FAILURE" });
      throw new Error("Error deleting task");
    }
  };
};

export const setPage = (page) => {
  return {
    type: "SET_PAGE",
    payload: page,
  };
};

export const setSearchQuery = (query) => {
  return {
    type: "SET_SEARCH_QUERY",
    payload: query,
  };
};

export const setSearchReult = (result) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "SEARCH_REQUEST" });
      // Simulate API call delay
      await new Promise((res) => setTimeout(res, 1000));

      // Dispatch the action to edit the task
      dispatch({
        type: "SEARCH_REQUEST_SUCCESS",
        payload: result,
      });

      return "Search successfully";
    } catch (error) {
      dispatch({ type: "SEARCH_REQUEST_FAILURE" });
      throw new Error("Error searching task");
    }
  };
};

export const setSortBy = (sortBy) => {
  return {
    type: "SET_SORT_BY",
    payload: sortBy,
  };
};

export const setSortResult = (result) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "SORT_REQUEST" });
      // Simulate API call delay
      await new Promise((res) => setTimeout(res, 1000));

      // Dispatch the action to edit the task
      dispatch({
        type: "SORT_REQUEST_SUCCESS",
        payload: result,
      });
      return "Sort successfully";
    } catch (error) {
      dispatch({ type: "SORT_REQUEST_FAILURE" });
      throw new Error("Error sorting task");
    }
  };
};
