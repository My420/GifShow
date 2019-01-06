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
        currentData: (payload.offset = 0
          ? { ...payload.data.data }
          : { ...dataState.currentData, ...payload.data.data }), // [1] // если оффсет = 0, то заменяем все текущие данные, в ином случае добавляем новые данные к уже имеющимся
        itemTotalCount: payload.data.pagination.total_count //[2]
      };
  }
  return dataState;
};
