import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  setSearchQuery,
  setSortBy,
  addTask,
  editTask,
  deleteTask,
} from "../taskActions";
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Task Actions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("setSearchQuery action", () => {
    const action = setSearchQuery("search query");
    expect(action).toEqual({
      type: "SET_SEARCH_QUERY",
      payload: "search query",
    });
  });

  test("setSortBy action", () => {
    const action = setSortBy("name");
    expect(action).toEqual({
      type: "SET_SORT_BY",
      payload: "name",
    });
  });
});

describe("Task Actions - Asynchronous", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("addTask success", async () => {
    const taskData = {
      name: "Test Task",
      description: "Testing",
      category: "Test",
      status: "Incomplete",
    };
    const store = mockStore({});

    const expectedActions = [
      { type: "ADD_TASK_REQUEST" },
      { type: "ADD_TASK_SUCCESS", payload: taskData },
    ];

    await store.dispatch(addTask(taskData));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test("addTask failure", async () => {
    const store = mockStore({});
    await expect(store.dispatch(addTask())).rejects.toThrow(
      "Error adding task"
    );
  });

  test("editTask success", async () => {
    const taskId = 1;
    const updatedTask = {
      name: "Updated Task",
      description: "Updated",
      category: "Updated",
      status: "Complete",
    };
    const store = mockStore({});

    const expectedActions = [
      { type: "EDIT_TASK_REQUEST" },
      { type: "EDIT_TASK_SUCCESS", payload: { taskId, updatedTask } },
    ];

    await store.dispatch(editTask(taskId, updatedTask));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test("editTask failure", async () => {
    const store = mockStore({});
    await expect(store.dispatch(editTask())).rejects.toThrow(
      "Error editing task"
    );
  });

  test("deleteTask success", async () => {
    const taskIdToDelete = 1;
    const store = mockStore({});

    const expectedActions = [
      { type: "DELETE_TASK_REQUEST" },
      { type: "DELETE_TASK_SUCCESS", payload: { taskIdToDelete } },
    ];

    await store.dispatch(deleteTask(taskIdToDelete));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test("deleteTask failure", async () => {
    const store = mockStore({});
    await expect(store.dispatch(deleteTask())).rejects.toThrow(
      "Error deleting task"
    );
  });
});
