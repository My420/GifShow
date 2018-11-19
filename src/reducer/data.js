import { LOAD_START, GET_LOAD_DATA, LOAD_COMPLETE } from "../constant";

const defaultState = {
  isLoading: false,
  currentData: [],
  isError: false,
  ErrorMassage: ``,
  dataStore: {},
  itemTotalCount: null
};

export default (dataState = defaultState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_START:
      return { ...dataState, isLoading: true };

    case LOAD_COMPLETE: //пришло все, но в стор ложим только то, что нужно [1], [2]
      return {
        ...dataState,
        isLoading: false,
        currentData: payload.data.data, // [1]
        itemTotalCount: payload.data.pagination.total_count //[2]
      };
  }
  return dataState;
};
