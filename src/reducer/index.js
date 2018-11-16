import { combineReducers } from "redux";
import isAutoplay from "./autoplay";
import data from "./data";

export default combineReducers({
  isAutoplay,
  data
});
