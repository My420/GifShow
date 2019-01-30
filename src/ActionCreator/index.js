import {
  SET_AUTOPLAY,
  LOAD_DATA,
  CHANGE_GALLERY_ITEM,
  CLOSE_GALLERY
} from "../constant";
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

export const changeGalleryItem = function(itemUrl, itemType, itemData) {
  return {
    type: CHANGE_GALLERY_ITEM,
    payload: { itemUrl, itemType, itemData }
  };
};

export const closeGallery = function() {
  return {
    type: CLOSE_GALLERY
  };
};
