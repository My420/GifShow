import { TRENDS, SERCH, GIF, STICKER } from "../constant";

export const calcNewURL = function(prevUrl, path, data = false) {
  let newURL;

  if (path === TRENDS || path === SERCH) {
    newURL = prevUrl.split(`/`, 3);
    newURL[2] = path;
    if (newURL[1] !== GIF && newURL[1] !== STICKER) {
      newURL[1] = GIF;
    }
    if (data) {
      newURL[3] = data;
    }
    newURL = newURL.join(`/`) + `/`;
  } else if (path === GIF || path === STICKER) {
    newURL = prevUrl.split(`/`);
    newURL[1] = path;
    if (newURL[2] === ``) {
      newURL[2] = TRENDS;
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

export const getRequestURL = function(parameters) {
  return `http://localhost:3000/trends.json`;
};
