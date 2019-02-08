import {
  TRENDING,
  SEARCH,
  RANDOM,
  ORIGINAL,
  ID,
  GIFS,
  STICKERS,
  API_HOST,
  API_KEY,
  GALLERY_CONTROLS_HEIGHT,
  GALLERY_CONTROLS_WIDTH,
  GALLERY_CONTROLS_BOTTOM_MARGIN,
  GALLERY_IMAGE_BOTTOM_MARGIN,
  GALLERY_PADDING,
  SIZE_REDUCE_RATE,
  HEIGHT_MARGIN
} from "../constant";

export const calcNewURL = function(prevUrl, path, data = false) {
  let newURL;

  if (path === TRENDING || path === SEARCH || path === RANDOM) {
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
  let isRequestSingleItem;

  switch (actionType) {
    case TRENDING: {
      isRequestSingleItem = false;
      addressForStorage = `${itemType}/${actionType}/${offset}`;
      addressForAPI = `${API_HOST}/${itemType}/${actionType}?&api_key=${API_KEY}&offset=${offset}`;
      break;
    }
    case SEARCH: {
      isRequestSingleItem = false;
      addressForStorage = `${itemType}/${actionType}/${payload}/${offset}`;
      addressForAPI = `${API_HOST}/${itemType}/${actionType}?q=${payload}&api_key=${API_KEY}&offset=${offset}`;
      break;
    }
    case ID: {
      isRequestSingleItem = true;
      addressForStorage = `${itemType}/${actionType}/${payload}`;
      addressForAPI = `${API_HOST}/${itemType}/${payload}?q=&api_key=${API_KEY}`;
      break;
    }

    case RANDOM: {
      isRequestSingleItem = true;
      addressForStorage = null;
      addressForAPI = `${API_HOST}/${itemType}/${actionType}?q=&api_key=${API_KEY}`;
      break;
    }
  }

  return { addressForStorage, addressForAPI, offset, isRequestSingleItem };
};

export const massToObj = function(arr) {
  return arr.reduce((prevValue, element) => {
    prevValue[element.id] = element;
    return prevValue;
  }, {});
};

export const sortOnHeight = function(a, b) {
  const firstItemHeight = +a.images.fixed_width.height;
  const secondItemHeight = +b.images.fixed_width.height;

  if (firstItemHeight > secondItemHeight) return 1;

  if (firstItemHeight < secondItemHeight) return -1;

  return 0;
};

export const checkStatus = function(response) {
  const responseStatus = +response.status;
  const responseMessage = response.statusText;
  if (responseStatus >= 200 && responseStatus < 300) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(responseMessage));
  }
};

const auditImageSize = function(
  imageWidth,
  imageHeight,
  clientWidth,
  clientHeight
) {
  let size = {};
  if (imageWidth > clientWidth || imageHeight > clientHeight - HEIGHT_MARGIN) {
    size.width = imageWidth * SIZE_REDUCE_RATE;
    size.height = imageHeight * SIZE_REDUCE_RATE;
    alert(`уменьшил`);
  } else {
    size.width = imageWidth;
    size.height = imageHeight;
  }
  return size;
};

export const calcTagsSize = function(
  imageOriginalWidth,
  imageOriginalHeight,
  clientWidth,
  clientHeight
) {
  let size = {
    wrapper: {},
    controls: {},
    gallery: {},
    margin: {
      image: GALLERY_IMAGE_BOTTOM_MARGIN,
      controls: GALLERY_CONTROLS_BOTTOM_MARGIN
    },
    padding: {
      gallery: GALLERY_PADDING
    }
  };

  const newImageWrapperSize = auditImageSize(
    imageOriginalWidth,
    imageOriginalHeight,
    clientWidth,
    clientHeight
  );
  size.wrapper.width = newImageWrapperSize.width;
  size.wrapper.height = newImageWrapperSize.height;

  size.controls.width = GALLERY_CONTROLS_WIDTH;
  size.controls.height = GALLERY_CONTROLS_HEIGHT;

  size.gallery.width =
    size.wrapper.width > size.controls.width
      ? size.wrapper.width + size.padding.gallery * 2
      : size.controls.width + size.padding.gallery * 2;

  size.gallery.height =
    size.wrapper.height +
    size.controls.height +
    size.margin.image +
    size.margin.controls +
    size.padding.gallery * 2;

  size.gallery.top = (clientHeight - size.gallery.height) / 2;
  size.gallery.left = (clientWidth - size.gallery.width) / 2;

  return size;
};

export const calcGalleryTagStyle = function(data, imageSizeType) {
  const imageOriginalWidth = +data.images.original.width;
  const imageOriginalHeight = +data.images.original.height;
  const imageSmallWidth = +data.images.fixed_width.width;
  const imageSmallHeight = +data.images.fixed_width.height;

  const clientWidth = document.documentElement.clientWidth;
  const clientHeight = document.documentElement.clientHeight;

  const galleryComponentsSize = calcTagsSize(
    imageOriginalWidth,
    imageOriginalHeight,
    clientWidth,
    clientHeight
  );

  const imageWrapperStyle = {
    width: galleryComponentsSize.wrapper.width + `px`,
    height: galleryComponentsSize.wrapper.height + `px`,
    margin: `0 0 ${galleryComponentsSize.margin.image + `px`} 0`
  };

  const galleryStyle = {
    width: galleryComponentsSize.gallery.width + `px`,
    height: galleryComponentsSize.gallery.height + `px`,
    top: galleryComponentsSize.gallery.top + `px`,
    left: galleryComponentsSize.gallery.left + `px`,
    padding: `${galleryComponentsSize.padding.gallery + `px`}`
  };
  const imageStyle = {
    width:
      `${
        imageSizeType === ORIGINAL
          ? galleryComponentsSize.wrapper.width
          : imageSmallWidth
      }` + `px`,
    height:
      `${
        imageSizeType === ORIGINAL
          ? galleryComponentsSize.wrapper.height
          : imageSmallHeight
      }` + `px`
  };

  return {
    imageWrapper: imageWrapperStyle,
    gallery: galleryStyle,
    image: imageStyle
  };
};
