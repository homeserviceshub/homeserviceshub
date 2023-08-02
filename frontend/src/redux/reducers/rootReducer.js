import { combineReducers } from "redux";
import reducer1 from "./reducer1";
import CheckLoginReducer from "./checkLoginReducer";
import RemainingTasksReducer from "./remainingTasksReducer";
const rootReducer = combineReducers({
  reducer1,
  CheckLoginReducer,
  RemainingTasksReducer,
});
export default rootReducer;
