import { LOAD_DATA, LOAD_START, LOAD_COMPLETE, LOAD_ERROR } from "../constant";
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
      offset,
      isRequestSingleItem
    } = requestedData;

    const currentStore = store.getState();
    const resultStore = currentStore.data.resultStore;

    if (resultStore[addressForStorage]) {
      console.log(`Загружаю из Хранилища`);
      requestedData.data = { ...resultStore[addressForStorage] }; // клонируем из хранилища.
      next({ ...action, type: LOAD_COMPLETE, payload: requestedData }); // отправляем все что пришло
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
          next({ ...action, type: LOAD_COMPLETE, payload: requestedData }); // отправляем все что пришло
        })
        .catch(error => {
          next({ ...action, type: LOAD_ERROR, payload: error.message });
        });
    }
  } else {
    return next(action);
  }
};
