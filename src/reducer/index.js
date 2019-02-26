import { combineReducers } from "redux";
import isAutoplay from "./autoplay";
import data from "./data";
import gallery from "./gallery";
import favorite from "./favorite";
import loadStatus from "./load";

export default combineReducers({
  isAutoplay,
  data,
  gallery,
  favorite,
  loadStatus
});
