import { REFRESH_FAVORITE } from "../constant";
import {
  createGifShowStorage,
  getGifShowStorage,
  setGifShowStorage
} from "../utils/localStorage";

const getDefaultState = function() {
  createGifShowStorage();
  return getGifShowStorage();
};

const defaultState = getDefaultState();

export default (favoriteState = defaultState, action) => {
  const { type, payload } = action;

  switch (type) {
    case REFRESH_FAVORITE: {
      const { newFavorite } = payload;
      setGifShowStorage(newFavorite);
      return { ...newFavorite };
    }
  }

  return favoriteState;
};
