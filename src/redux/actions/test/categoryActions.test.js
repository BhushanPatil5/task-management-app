import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { addCategory, editCategory, deleteCategory } from "../categoryActions";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Category Actions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("addCategory success", async () => {
    const categoryData = { name: "Test Category" };
    const store = mockStore({});

    const expectedActions = [
      { type: "ADD_CATEGORY_REQUEST" },
      { type: "ADD_CATEGORY_SUCCESS", payload: categoryData },
    ];

    await store.dispatch(addCategory(categoryData));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test("addCategory failure", async () => {
    const store = mockStore({});
    await expect(store.dispatch(addCategory())).rejects.toThrow(
      "Error adding category"
    );
  });

  test("editCategory success", async () => {
    const categoryId = 1;
    const updatedCategory = { name: "Updated Category" };
    const store = mockStore({});

    const expectedActions = [
      { type: "EDIT_CATEGORY_REQUEST" },
      {
        type: "EDIT_CATEGORY_SUCCESS",
        payload: { categoryId, updatedCategory },
      },
    ];

    await store.dispatch(editCategory(categoryId, updatedCategory));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test("editCategory failure", async () => {
    const store = mockStore({});
    await expect(store.dispatch(editCategory())).rejects.toThrow(
      "Error edit category"
    );
  });

  test("deleteCategory success", async () => {
    const categoryIdToDelete = 1;
    const store = mockStore({});

    const expectedActions = [
      { type: "EDIT_CATEGORY_REQUEST" },
      { type: "DELETE_CATEGORY_SUCCESS", payload: categoryIdToDelete },
    ];

    await store.dispatch(deleteCategory(categoryIdToDelete));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test("deleteCategory failure", async () => {
    const store = mockStore({});
    await expect(store.dispatch(deleteCategory())).rejects.toThrow(
      "Error delete category"
    );
  });
});
