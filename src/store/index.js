import { createStore, applyMiddleware} from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import logger from "redux-logger";
import reducer from "./reducers/contactReducer";

const middleware = applyMiddleware(logger)

export default createStore(reducer, composeWithDevTools(middleware))