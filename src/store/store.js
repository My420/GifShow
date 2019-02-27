import { createStore, applyMiddleware } from "redux";
import reducer from "../reducer/index";
import dataLoader from "../middlewares/dataloader";
import favoriteloader from "../middlewares/favoriteloader";

const enhancer = applyMiddleware(dataLoader, favoriteloader);

const store = createStore(reducer, {}, enhancer);

export default store;
