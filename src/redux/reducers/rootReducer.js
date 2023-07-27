import { combineReducers } from "redux";
import reducer1 from "./reducer1";
import checkLoginReducer from "./checkLoginReducer";
const rootReducer = combineReducers({ reducer1, checkLoginReducer });
export default rootReducer;
