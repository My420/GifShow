import {
  LOAD_START,
  GET_LOAD_DATA,
  LOAD_COMPLETE,
  LOAD_ERROR
} from "../constant";

const defaultState = {
  isLoading: false,
  currentData: [],
  isError: false,
  errorMessage: ``,
  resultStore: {},
  itemTotalCount: null
};

export default (dataState = defaultState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_START:
      return { ...dataState, isLoading: true, isError: false };

    case LOAD_COMPLETE: //пришло все, но в стор ложим только то, что нужно [1], [2]
      const getCurrentData = function() {
        if (payload.offset === 0) {
          return { ...payload.data.data };
        } else {
          return { ...dataState.currentData, ...payload.data.data };
        }
      };

      const getCurrentTotalCount = function() {
        if (!payload.isRequestSingleItem) {
          return payload.data.pagination.total_count;
        } else {
          return 1;
        }
      };

      const getResultStore = () => {
        const addressForStorage = payload.addressForStorage;
        const dataForStorage = { ...payload.data };
        if (addressForStorage) {
          return {
            ...dataState.resultStore,
            [addressForStorage]: dataForStorage
          };
        } else {
          return dataState.resultStore;
        }
      };

      return {
        ...dataState,
        isLoading: false,
        currentData: getCurrentData(), // [1] // если оффсет = 0, то заменяем все текущие данные, в ином случае добавляем новые данные к уже имеющимся
        itemTotalCount: getCurrentTotalCount(), //[2]
        resultStore: getResultStore()
      };

    case LOAD_ERROR:
      return {
        ...dataState,
        isError: true,
        errorMessage: payload,
        isLoading: false
      };

    default:
      return dataState;
  }
  /*return dataState;*/
};
