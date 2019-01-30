import { CHANGE_GALLERY_ITEM, CLOSE_GALLERY } from "../constant";

const defaultState = {
  itemData: {},
  itemUrl: ``,
  isGalleryOpen: false,
  itemType: null
};

export default (screenState = defaultState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CHANGE_GALLERY_ITEM:
      return {
        ...screenState,
        itemUrl: payload.itemUrl,
        itemData: payload.itemData,
        isGalleryOpen: true,
        itemType: payload.itemType
      };

    case CLOSE_GALLERY:
      return {
        ...screenState,
        isGalleryOpen: false
      };

    default:
      return screenState;
  }
};
