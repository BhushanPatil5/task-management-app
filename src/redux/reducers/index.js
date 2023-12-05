import { combineReducers } from "redux";
import taskReducer from "./taskReducer";
import categoryReducer from "./categoryReducer";

const rootReducer = combineReducers({
  tasks: taskReducer,
  categories: categoryReducer,
});

export default rootReducer;
