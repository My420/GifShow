import { SET_AUTOPLAY } from "../constant";

export const setAutoplay = function(isAutoplay) {
  return {
    type: SET_AUTOPLAY,
    payload: { isAutoplay }
  };
};
