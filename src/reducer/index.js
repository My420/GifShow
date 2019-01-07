import { combineReducers } from "redux";
import isAutoplay from "./autoplay";
import data from "./data";
import gallery from "./gallery";

export default combineReducers({
  isAutoplay,
  data,
  gallery
});
