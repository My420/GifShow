import {
  LOAD_DATA,
  LOAD_START,
  LOAD_COMPLETE,
  LOAD_ERROR,
  LOAD_FAVORITE,
  FAVORITE,
  GIF_SHOW,
  ADD_TO_FAVORITE,
  REFRESH_FAVORITE,
  DELETE_FROM_FAVORITE
} from "../constant";
import { getDataWithOffset } from "../utils/utils";

export default store => next => action => {
  console.log(`hello form middle --- FAVORITE`, action);
  const { type, payload } = action;

  if (type === LOAD_FAVORITE) {
    next({
      type: LOAD_START
    });

    const { itemType, offset } = payload;
    const fullData = store.getState()[FAVORITE][itemType];
    const data = getDataWithOffset(fullData, offset);

    const requestedData = {
      data: {
        data: data
      },
      offset: offset,
      isRequestSingleItem: true, // при значении true будет сам считать компонент
      addressForStorage: null
    };
    next({ ...action, type: LOAD_COMPLETE, payload: requestedData });
  }

  if (type === ADD_TO_FAVORITE || type === DELETE_FROM_FAVORITE) {
    const { data, itemType } = payload;
    const id = data.id;

    const favorite = store.getState()[FAVORITE];
    let newFavorite = { ...favorite };

    if (type === ADD_TO_FAVORITE) {
      newFavorite[itemType][id] = data;
    } else if (type === DELETE_FROM_FAVORITE) {
      delete newFavorite[itemType][id];
    }

    next({ ...action, type: REFRESH_FAVORITE, payload: { newFavorite } });
  }

  /* if (type === ADD_TO_FAVORITE) {
    const { data, itemType } = payload;
    const id = data.id;

    const favorite = store.getState()[FAVORITE];
    let newFavorite = { ...favorite };

    newFavorite[itemType][id] = data;

    next({ ...action, type: REFRESH_FAVORITE, payload: { newFavorite } });
  }

  if (type === DELETE_FROM_FAVORITE) {
    const { data, itemType } = payload;
    const id = data.id;

    const favorite = store.getState()[FAVORITE];
    let newFavorite = { ...favorite };

    delete newFavorite[itemType][id];

    next({ ...action, type: REFRESH_FAVORITE, payload: { newFavorite } });
  }*/

  return next(action);
};
