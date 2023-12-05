export const addCategory = (category) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "ADD_CATEGORY_REQUEST" });
      await new Promise((res) => setTimeout(res, 2000));

      if (category) {
        dispatch({
          type: "ADD_CATEGORY_SUCCESS",
          payload: category,
        });
        return "Category added successfully";
      } else {
        dispatch({ type: "ADD_CATEGORY_FAILURE" });
        throw new Error("Error adding category");
      }
    } catch (error) {
      dispatch({ type: "ADD_TASK_FAILURE" });
      throw new Error("Error adding category");
    }
  };
};

export const editCategory = (categoryId, updatedCategory) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "EDIT_CATEGORY_REQUEST" });
      await new Promise((res) => setTimeout(res, 2000));

      if ((categoryId, updatedCategory)) {
        dispatch({
          type: "EDIT_CATEGORY_SUCCESS",
          payload: { categoryId, updatedCategory },
        });
        return "Category edit successfully";
      } else {
        dispatch({ type: "EDIT_CATEGORY_FAILURE" });
        throw new Error("Error edit category");
      }
    } catch (error) {
      dispatch({ type: "EDIT_TASK_FAILURE" });
      throw new Error("Error edit category");
    }
  };
};

export const deleteCategory = (categoryId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "EDIT_CATEGORY_REQUEST" });
      await new Promise((res) => setTimeout(res, 2000));

      if (categoryId) {
        dispatch({
          type: "DELETE_CATEGORY_SUCCESS",
          payload: categoryId,
        });
        return "Category delete successfully";
      } else {
        dispatch({ type: "DELETE_CATEGORY_FAILURE" });
        throw new Error("Error delete category");
      }
    } catch (error) {
      dispatch({ type: "DELETE_TASK_FAILURE" });
      throw new Error("Error delete category");
    }
  };
};
