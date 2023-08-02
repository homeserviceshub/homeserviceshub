import { createStore } from "redux";
import RootReducer from "./reducers/rootReducer";
const MyStore = createStore(RootReducer);

export default MyStore;
