import {
  SET_AUTOPLAY,
  LOAD_DATA,
  CHANGE_GALLERY_ITEM,
  CLOSE_GALLERY,
  LOAD_FAVORITE,
  DELETE_FROM_FAVORITE,
  ADD_TO_FAVORITE
} from "../constant";

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

export const getFavorite = function(request) {
  return {
    type: LOAD_FAVORITE,
    payload: request
  };
};

export const deleteItemFromFavorite = function(data, itemType) {
  return {
    type: DELETE_FROM_FAVORITE,
    payload: { data, itemType }
  };
};

export const addItemToFavorite = function(data, itemType) {
  return {
    type: ADD_TO_FAVORITE,
    payload: { data, itemType }
  };
};
