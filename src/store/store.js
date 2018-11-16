import { createStore, applyMiddleware } from "redux";
import reducer from "../reducer/index";
import logger from "redux-logger";
import dataLoader from "../middlewares/dataloader";
import thunk from "redux-thunk";

const enhancer = applyMiddleware(thunk, dataLoader, logger);

const store = createStore(reducer, {}, enhancer);

//dev only
window.store = store;

export default store;
