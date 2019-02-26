import { CHANGE_CURRENT_DATA } from "../constant";

const defaultState = {
  currentData: [],

  resultStore: {},
  itemTotalCount: null
};

export default (dataState = defaultState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CHANGE_CURRENT_DATA:
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

        currentData: getCurrentData(), // [1] // если оффсет = 0, то заменяем все текущие данные, в ином случае добавляем новые данные к уже имеющимся
        itemTotalCount: getCurrentTotalCount(), //[2]
        resultStore: getResultStore()
      };

    default:
      return dataState;
  }
};
