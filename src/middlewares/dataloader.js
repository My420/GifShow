import { LOAD_DATA, LOAD_START, LOAD_COMPLETE } from "../constant";

export default store => next => action => {
  console.log(`hello form middle`, action);
  if (action.type === LOAD_DATA) {
    next({
      type: LOAD_START
    });

    setTimeout(() => {
      next({ ...action, type: LOAD_COMPLETE });
    }, 5000);

    /*setTimeout(() => {
      get
    }, 5000);*/
  } else {
    return next(action);
  }
};
