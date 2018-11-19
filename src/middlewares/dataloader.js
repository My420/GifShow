import { LOAD_DATA, LOAD_START, LOAD_COMPLETE } from "../constant";
import { getAddressFromRequest, massToObj } from "../utils/utils";

export default store => next => action => {
  console.log(`hello form middle`, action);
  const { type, payload } = action;
  if (type === LOAD_DATA) {
    next({
      type: LOAD_START
    });

    const requestedData = getAddressFromRequest(payload);
    console.log(`adressssss`, requestedData);

    fetch(requestedData.addressForAPI)
      .then(resp => {
        return resp.json();
      })
      .then(data => {
        requestedData.data = data;
        requestedData.data.data = massToObj(requestedData.data.data); // преобразовываем массив картинок в объект для удобства
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
