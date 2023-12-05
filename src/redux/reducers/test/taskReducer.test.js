import taskReducer from "../taskReducer";
import { setSearchQuery, setSortBy } from "../../actions/taskActions";

describe("Task Reducer", () => {
  test("SET_SEARCH_QUERY action", () => {
    const initialState = { searchQuery: "" };
    const newState = taskReducer(
      initialState,
      setSearchQuery("new search query")
    );
    expect(newState).toEqual({ searchQuery: "new search query" });
  });

  test("SET_SORT_BY action", () => {
    const initialState = { sortBy: "name" };
    const newState = taskReducer(initialState, setSortBy("category"));
    expect(newState).toEqual({ sortBy: "category" });
  });
});
