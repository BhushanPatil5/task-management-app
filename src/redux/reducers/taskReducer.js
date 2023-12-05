const initialState = {
  tasks: [],
  loading: false,
  loadingSearch: false,
  loadingSort: false,
  loadingDelete: false,
  currentPage: 1,
  tasksPerPage: 5,
  searchQuery: "",
  searchResult: [],
  sortResult: [],
  sortBy: "",
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TASK_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "ADD_TASK_SUCCESS":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        loading: false,
      };
    case "ADD_TASK_FAILURE":
      return {
        ...state,
        loading: false,
      };
    case "EDIT_TASK_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "EDIT_TASK_SUCCESS":
      const { taskId, updatedTask } = action.payload;
      const updatedTasks = state.tasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedTask } : task
      );

      return {
        ...state,
        tasks: updatedTasks,
        loading: false,
      };
    case "DELETE_TASK_FAILURE":
      return {
        ...state,
        loadingDelete: false,
      };

    case "DELETE_TASK_REQUEST":
      return {
        ...state,
        loadingDelete: true,
      };
    case "DELETE_TASK_SUCCESS":
      const { taskIdToDelete } = action.payload;
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== taskIdToDelete),
        loadingDelete: false,
      };
    case "EDIT_TASK_FAILURE":
      return {
        ...state,
        loading: false,
      };
    case "SET_PAGE":
      return {
        ...state,
        currentPage: action.payload,
      };
    case "SET_SEARCH_QUERY":
      return {
        ...state,
        searchQuery: action.payload,
      };

    case "SEARCH_REQUEST":
      return {
        ...state,
        loadingSearch: true,
      };

    case "SEARCH_REQUEST_SUCCESS":
      return {
        ...state,
        searchResult: action.payload,
        loadingSearch: false,
      };

    case "SEARCH_REQUEST_FAILURE":
      return {
        ...state,
        loadingSearch: false,
      };

    case "SET_SORT_BY":
      return {
        ...state,
        sortBy: action.payload,
      };

    case "SORT_REQUEST":
      return {
        ...state,
        loadingSort: true,
      };

    case "SORT_REQUEST_SUCCESS":
      return {
        ...state,
        tasks: action.payload,
        loadingSort: false,
      };

    case "SORT_REQUEST_FAILURE":
      return {
        ...state,
        loadingSort: false,
      };

    default:
      return state;
  }
};

export default taskReducer;
