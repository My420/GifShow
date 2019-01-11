import { LOAD_DATA, LOAD_START, LOAD_COMPLETE } from "../constant";
import { getAddressFromRequest, massToObj, sortOnHeight } from "../utils/utils";

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

    fetch(addressForAPI)
      .then(resp => {
        return resp.json();
      })
      .then(data => {
        requestedData.data = data;
        console.log(
          `дляинна загруженного массива`,
          requestedData.data.data.length
        );
        if (!isRequestSingleItem) {
          requestedData.data.data.sort(sortOnHeight); //сортируем по высоте, в порядке возрастания
          requestedData.data.data = massToObj(requestedData.data.data); // преобразовываем массив объектов в объект для удобства
        } else {
          const id = requestedData.data.data.id;
          requestedData.data.data = { [id]: requestedData.data.data };
        }
        next({ ...action, type: LOAD_COMPLETE, payload: requestedData }); // отправляем все что пришло
      });

    /*setTimeout(() => {
      console.log(`Загружено`, requestedData);
      next({ ...action, type: LOAD_COMPLETE });
    }, 5000);*/
  } else {
    return next(action);
  }
};
