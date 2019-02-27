import {
  LOAD_DATA,
  LOAD_START,
  LOAD_COMPLETE,
  LOAD_ERROR,
  CHANGE_CURRENT_DATA
} from "../constant";
import {
  getAddressFromRequest,
  massToObj,
  sortOnHeight,
  checkStatus
} from "../utils/utils";

export default store => next => action => {
  const { type, payload } = action;
  if (type === LOAD_DATA) {
    next({
      type: LOAD_START
    });

    const requestedData = getAddressFromRequest(payload);

    const {
      addressForAPI,
      addressForStorage,
      isRequestSingleItem
    } = requestedData;

    const currentStore = store.getState();
    const resultStore = currentStore.data.resultStore;

    if (resultStore[addressForStorage]) {
      requestedData.data = { ...resultStore[addressForStorage] };
      next({ ...action, type: CHANGE_CURRENT_DATA, payload: requestedData });
      next({ type: LOAD_COMPLETE });
    } else {
      fetch(addressForAPI)
        .then(checkStatus)
        .then(resp => {
          return resp.json();
        })
        .then(data => {
          requestedData.data = data;
          if (!isRequestSingleItem) {
            requestedData.data.data.sort(sortOnHeight);
            requestedData.data.data = massToObj(requestedData.data.data);
          } else {
            const id = requestedData.data.data.id;
            requestedData.data.data = { [id]: requestedData.data.data };
          }
          next({
            ...action,
            type: CHANGE_CURRENT_DATA,
            payload: requestedData
          });
          next({ type: LOAD_COMPLETE });
        })
        .catch(error => {
          next({ ...action, type: LOAD_ERROR, payload: error.message });
        });
    }
  }
  return next(action);
};
