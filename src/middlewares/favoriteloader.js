import {
  LOAD_START,
  LOAD_COMPLETE,
  LOAD_FAVORITE,
  FAVORITE,
  CHANGE_CURRENT_DATA,
  ADD_TO_FAVORITE,
  REFRESH_FAVORITE,
  DELETE_FROM_FAVORITE
} from "../constant";
import { getDataWithOffset, getItemsAmount } from "../utils/utils";

export default store => next => action => {
  const { type, payload } = action;

  if (type === LOAD_FAVORITE) {
    next({
      type: LOAD_START
    });

    const { itemType, offset } = payload;
    const fullData = store.getState()[FAVORITE][itemType];
    const total_count = getItemsAmount(fullData);
    const data = getDataWithOffset(fullData, offset);

    const requestedData = {
      data: {
        data: data,
        pagination: {
          total_count: total_count
        }
      },
      offset: offset,
      isRequestSingleItem: false,
      addressForStorage: null
    };
    next({
      ...action,
      type: CHANGE_CURRENT_DATA,
      payload: requestedData
    });
    next({ type: LOAD_COMPLETE });
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
  return next(action);
};
