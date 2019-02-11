import { createStore, applyMiddleware } from "redux";
import reducer from "../reducer/index";
import logger from "redux-logger";
import dataLoader from "../middlewares/dataloader";
import thunk from "redux-thunk";
import favoriteloader from "../middlewares/favoriteloader";

const enhancer = applyMiddleware(thunk, dataLoader, favoriteloader, logger);

const store = createStore(reducer, {}, enhancer);

//dev only
window.store = store;

export default store;
