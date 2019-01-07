import { SET_AUTOPLAY, LOAD_DATA } from "../constant";
import { getRequestURL } from "../utils/utils";

export const setAutoplay = function(isAutoplay) {
  return {
    type: SET_AUTOPLAY,
    payload: { isAutoplay }
  };
};

export const loadData = function(request) {
  return {
    type: LOAD_DATA,
    payload: request
  };
};

export const change = function(url, data) {
  return {
    type: `CHANGE`,
    payload: { url, data }
  };
};
