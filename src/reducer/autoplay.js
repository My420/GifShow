import { SET_AUTOPLAY } from "../constant";
export default (isAutoplay = false, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_AUTOPLAY:
      return payload.isAutoplay;
  }

  return isAutoplay;
};
