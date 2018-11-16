import { LOAD_START, GET_LOAD_DATA, LOAD_COMPLETE } from "../constant";

const defaultState = {
  isLoading: false,
  data: [],
  isError: false,
  ErrorMassage: ``,
  dataStore: {}
};

export default (dataState = defaultState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_START:
      return { ...dataState, isLoading: true };

    case LOAD_COMPLETE:
      return { ...dataState, isLoading: false, data: payload };
  }
  return dataState;
};
