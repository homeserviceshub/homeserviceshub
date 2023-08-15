import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import RootReducer from "./reducers/rootReducer";
const MyStore = createStore(RootReducer, applyMiddleware(thunk));

export default MyStore;
