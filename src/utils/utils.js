import {
  TRENDING,
  SEARCH,
  ID,
  GIFS,
  STICKERS,
  API_HOST,
  API_KEY
} from "../constant";

export const calcNewURL = function(prevUrl, path, data = false) {
  let newURL;

  if (path === TRENDING || path === SEARCH) {
    newURL = prevUrl.split(`/`, 3);
    newURL[2] = path;
    if (newURL[1] !== GIFS && newURL[1] !== STICKERS) {
      newURL[1] = GIFS;
    }
    if (data) {
      newURL[3] = data;
    }
    newURL = newURL.join(`/`) + `/`;
  } else if (path === GIFS || path === STICKERS) {
    newURL = prevUrl.split(`/`);
    newURL[1] = path;
    if (newURL[2] === ``) {
      newURL[2] = TRENDING;
    }
    newURL = newURL.join(`/`);
  } else {
    newURL = false;
  }

  return newURL;
};

export const convertUserInput = function(text) {
  let convertText = text.trim().replace(/ /g, `+`); // регуляркой разбить на массив слов/ .join(`+`)
  return convertText;
};

export const createRequestFromURL = function(url, offset) {
  url = url.split(`/`);
  return {
    itemType: url[1],
    actionType: url[2],
    offset: offset,
    payload: url[3]
  };
};

export const getAddressFromRequest = function(param) {
  console.log(param);

  const { itemType, actionType, offset, payload } = param;
  let addressForStorage;
  let addressForAPI;

  switch (actionType) {
    case TRENDING: {
      addressForStorage = `${itemType}/${actionType}/${offset}`;
      addressForAPI = `${API_HOST}/${itemType}/${actionType}?&api_key=${API_KEY}&offset=${offset}`;
      break;
    }
    case SEARCH: {
      addressForStorage = `${itemType}/${actionType}/${payload}/${offset}`;
      addressForAPI = `${API_HOST}/${itemType}/${actionType}?q=${payload}&api_key=${API_KEY}&offset=${offset}`;
      break;
    }
    case ID: {
      addressForStorage = false;
      addressForAPI = `${API_HOST}/${itemType}/${payload}?q=&api_key=${API_KEY}`;
      break;
    }
  }

  return { addressForStorage, addressForAPI, offset };
};

export const massToObj = function(arr) {
  return arr.reduce((prevValue, element) => {
    prevValue[element.id] = element;
    return prevValue;
  }, {});
};
