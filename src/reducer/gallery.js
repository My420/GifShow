import { CHANGE_GALLERY_ITEM } from "../constant";

const defaultState = {
  itemData: {},
  itemUrl: ``,
  isGalleryOpen: false
};

export default (screenState = defaultState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CHANGE_GALLERY_ITEM:
      return {
        ...screenState,
        itemUrl: payload.itemUrl,
        itemData: payload.itemData,
        isGalleryOpen: true
      };

    default:
      return screenState;
  }
};
