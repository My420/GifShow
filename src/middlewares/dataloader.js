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
  console.log(`hello form middle`, action);
  const { type, payload } = action;
  if (type === LOAD_DATA) {
    next({
      type: LOAD_START
    });

    console.log(`hello form middle-------`, payload);
    const requestedData = getAddressFromRequest(payload);
    console.log(`adressssss`, requestedData);
    const {
      addressForAPI,
      addressForStorage,
      isRequestSingleItem
    } = requestedData;

    const currentStore = store.getState();
    const resultStore = currentStore.data.resultStore;

    if (resultStore[addressForStorage]) {
      console.log(`Загружаю из Хранилища`);
      requestedData.data = { ...resultStore[addressForStorage] };
      next({ ...action, type: CHANGE_CURRENT_DATA, payload: requestedData });
      next({ type: LOAD_COMPLETE });
    } else {
      console.log(`Загружаю из API`);

      fetch(addressForAPI)
        .then(checkStatus) // отправляем запрос к API
        .then(resp => {
          return resp.json();
        })
        .then(data => {
          requestedData.data = data;
          if (!isRequestSingleItem) {
            requestedData.data.data.sort(sortOnHeight); //сортируем по высоте, в порядке возрастания
            requestedData.data.data = massToObj(requestedData.data.data); // преобразовываем массив объектов в объект для удобства
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
