import { LOAD_START, LOAD_COMPLETE, LOAD_ERROR } from "../constant";

const defaultState = {
  isLoading: false,
  isError: false,
  errorMessage: ``
};

export default (loadState = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_START:
      return { ...loadState, isLoading: true, isError: false };

    case LOAD_COMPLETE:
      return { ...loadState, isLoading: false, isError: false };

    case LOAD_ERROR:
      return {
        ...loadState,
        isError: true,
        errorMessage: payload,
        isLoading: false
      };

    default:
      return loadState;
  }
};
