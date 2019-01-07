import { combineReducers } from "redux";
import isAutoplay from "./autoplay";
import data from "./data";
import screen from "./screen";

export default combineReducers({
  isAutoplay,
  data,
  screen
});
