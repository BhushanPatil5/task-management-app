import categoryReducer from "../categoryReducer";

describe("Category Reducer", () => {
  const initialState = {
    categories: [
      {
        name: "High",
        id: 1,
      },
      {
        name: "Medium",
        id: 2,
      },
      {
        name: "Low",
        id: 3,
      },
    ],
    loading: false,
  };

  it("should return the initial state", () => {
    expect(categoryReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle ADD_CATEGORY_REQUEST", () => {
    const action = { type: "ADD_CATEGORY_REQUEST" };
    const expectedState = { ...initialState, loading: true };
    expect(categoryReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle ADD_CATEGORY_SUCCESS", () => {
    const newCategory = { name: "New Category", id: 4 };
    const action = { type: "ADD_CATEGORY_SUCCESS", payload: newCategory };
    const expectedState = {
      ...initialState,
      categories: [...initialState.categories, newCategory],
      loading: false,
    };
    expect(categoryReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle ADD_CATEGORY_FAILURE", () => {
    const action = { type: "ADD_CATEGORY_FAILURE" };
    const expectedState = { ...initialState, loading: false };
    expect(categoryReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle EDIT_CATEGORY_REQUEST", () => {
    const action = { type: "EDIT_CATEGORY_REQUEST" };
    const expectedState = { ...initialState, loading: true };
    expect(categoryReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle EDIT_CATEGORY_SUCCESS", () => {
    const updatedCategory = { name: "Updated Category", id: 2 };
    const action = {
      type: "EDIT_CATEGORY_SUCCESS",
      payload: { categoryId: 2, updatedCategory },
    };
    const expectedState = {
      ...initialState,
      categories: initialState.categories.map((category) =>
        category.id === 2 ? { ...category, ...updatedCategory } : category
      ),
      loading: false,
    };
    expect(categoryReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle EDIT_CATEGORY_FAILURE", () => {
    const action = { type: "EDIT_CATEGORY_FAILURE" };
    const expectedState = { ...initialState, loading: false };
    expect(categoryReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle DELETE_CATEGORY_REQUEST", () => {
    const action = { type: "DELETE_CATEGORY_REQUEST" };
    const expectedState = { ...initialState, loading: true };
    expect(categoryReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle DELETE_CATEGORY_SUCCESS", () => {
    const action = { type: "DELETE_CATEGORY_SUCCESS", payload: 1 };
    const expectedState = {
      ...initialState,
      categories: initialState.categories.filter(
        (category) => category.id !== 1
      ),
      loading: false,
    };
    expect(categoryReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle DELETE_CATEGORY_FAILURE", () => {
    const action = { type: "DELETE_CATEGORY_FAILURE" };
    const expectedState = { ...initialState, loading: false };
    expect(categoryReducer(initialState, action)).toEqual(expectedState);
  });
});
