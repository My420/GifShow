import { LOAD_START, GET_LOAD_DATA, LOAD_COMPLETE } from "../constant";

const defaultState = {
  item: {},
  itemUrl: ``
};

export default (screenState = defaultState, action) => {
  const { type, payload } = action;

  switch (type) {
    case `CHANGE`:
      return { ...screenState, itemUrl: payload };

    default:
      return screenState;
  }
  /*return dataState;*/
};
