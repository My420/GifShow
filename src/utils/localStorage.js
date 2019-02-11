import { GIFS, STICKERS, FAVORITE, GIF_SHOW } from "../constant";

let localStorage = window.localStorage;

const defaultGifShowStorage = {
  [GIFS]: {},
  [STICKERS]: {}
};

export const createGifShowStorage = function() {
  if (!localStorage.getItem(GIF_SHOW)) {
    localStorage.setItem(GIF_SHOW, JSON.stringify(defaultGifShowStorage));
  }
};

export const getGifShowStorage = function() {
  return JSON.parse(localStorage.getItem(GIF_SHOW));
};

export const setGifShowStorage = function(newStorage) {
  localStorage.setItem(GIF_SHOW, JSON.stringify(newStorage));
};
