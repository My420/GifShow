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
  GALLERY_PADDING,
  CONTROLS_WIDTH,
  FAVORITE,
  INCREASE_OFFSET_VALUE,
  MIN_WIDTH_FOR_COLUMNS,
  NUMBER_OF_COLUMNS,
  DISTANCE_BETWEEN_ITEM,
  CONTROLS_HEIGHT,
  SCREEN_PADDING
} from "../constant";

export const calcNewURL = function(prevUrl, path, data = false) {
  let newURL;

  if (
    path === TRENDING ||
    path === SEARCH ||
    path === RANDOM ||
    path === FAVORITE
  ) {
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

export const calcTagsSize = function(
  imageOriginalWidth,
  imageOriginalHeight,
  numberOfColumns
) {
  let size = {
    gallery: {},
    inner: {},
    image: {},
    controls: {},
    screen: {}
  };

  size.image.width = imageOriginalWidth;
  size.image.height = imageOriginalHeight;

  size.controls.width =
    size.image.width > CONTROLS_WIDTH[`${numberOfColumns}`]
      ? size.image.width
      : CONTROLS_WIDTH[`${numberOfColumns}`];
  size.controls.height = CONTROLS_HEIGHT[`${numberOfColumns}`];

  size.screen.width = size.controls.width;
  size.screen.height = size.image.height;

  size.inner.width = size.controls.width;
  size.inner.height = size.image.height + size.controls.height;

  size.gallery.width = size.inner.width + GALLERY_PADDING[`${numberOfColumns}`];
  size.gallery.height =
    size.inner.height + GALLERY_PADDING[`${numberOfColumns}`];

  return size;
};

export const resizeTags = function(
  tagSize,
  clientWidth,
  clientHeight,
  numberOfColumns
) {
  const widthDifference = tagSize.gallery.width - clientWidth;
  const heightDifference = tagSize.gallery.height - clientHeight;

  if (widthDifference > heightDifference) {
    const newImageWidth = clientWidth - GALLERY_PADDING[`${numberOfColumns}`];
    const widthRate = newImageWidth / tagSize.image.width;
    const newImageHeight = tagSize.image.height * widthRate;

    return calcTagsSize(newImageWidth, newImageHeight, numberOfColumns);
  }
  const newImageHeight =
    clientHeight -
    GALLERY_PADDING[`${numberOfColumns}`] -
    CONTROLS_HEIGHT[`${numberOfColumns}`];
  const heightRate = newImageHeight / tagSize.image.height;
  const newImageWidth = tagSize.image.width * heightRate;

  return calcTagsSize(newImageWidth, newImageHeight, numberOfColumns);
};

export const calcGalleryTagStyle = function(
  data,
  imageSizeType,
  numberOfColumns
) {
  const imageOriginalWidth = +data.images.original.width;
  const imageOriginalHeight = +data.images.original.height;
  const imageSmallWidth = +data.images.fixed_width.width;
  const imageSmallHeight = +data.images.fixed_width.height;

  const clientWidth = document.documentElement.clientWidth - SCREEN_PADDING;
  const clientHeight = document.documentElement.clientHeight - SCREEN_PADDING;

  const tagSize = calcTagsSize(
    imageOriginalWidth,
    imageOriginalHeight,
    numberOfColumns
  );
  let galleryComponentsSize = { ...tagSize };

  if (
    clientWidth < tagSize.gallery.width ||
    clientHeight < tagSize.gallery.height
  ) {
    galleryComponentsSize = resizeTags(
      tagSize,
      clientWidth,
      clientHeight,
      numberOfColumns
    );
  }

  const galleryStyle = {
    width: galleryComponentsSize.gallery.width + `px`,
    height: galleryComponentsSize.gallery.height + `px`,
    top: `${(clientHeight +
      SCREEN_PADDING -
      galleryComponentsSize.gallery.height) /
      2}px`,
    left: `${(clientWidth +
      SCREEN_PADDING -
      galleryComponentsSize.gallery.width) /
      2}px`
  };

  const innerStyle = {
    width: galleryComponentsSize.inner.width + `px`,
    height: galleryComponentsSize.inner.height + `px`
  };

  const screenStyle = {
    width: galleryComponentsSize.screen.width + `px`,
    height: galleryComponentsSize.screen.height + `px`
  };

  const imageStyle = {
    width:
      `${
        imageSizeType === ORIGINAL
          ? galleryComponentsSize.image.width
          : imageSmallWidth
      }` + `px`,
    height:
      `${
        imageSizeType === ORIGINAL
          ? galleryComponentsSize.image.height
          : imageSmallHeight
      }` + `px`
  };

  const controlsStyle = {
    width: galleryComponentsSize.controls.width + `px`,
    height: galleryComponentsSize.controls.height + `px`
  };

  return {
    gallery: galleryStyle,
    inner: innerStyle,
    image: imageStyle,
    controls: controlsStyle,
    screen: screenStyle
  };
};

export const includeFavoriteItemId = function(id, itemType, favoriteItems) {
  let isInclude = false;
  for (const key in favoriteItems[itemType]) {
    if (id === key) isInclude = true;
  }

  return isInclude;
};

export const getDataWithOffset = function(fullData, offset) {
  let data = {};
  let start = offset + 1;
  let end = offset + INCREASE_OFFSET_VALUE;
  let i = 1;
  for (const key in fullData) {
    if (i >= start && i <= end) {
      data[key] = fullData[key];
    }
    i++;
    if (i > end) return data;
  }

  return data;
};

export const getItemsAmount = function(fullData) {
  let counter = 0;

  for (const key in fullData) {
    counter++;
  }

  return counter;
};

export const defineNumberOfColumns = function(width) {
  if (width >= MIN_WIDTH_FOR_COLUMNS.FOUR) {
    return NUMBER_OF_COLUMNS.FOUR;
  } else if (width >= MIN_WIDTH_FOR_COLUMNS.THREE) {
    return NUMBER_OF_COLUMNS.THREE;
  } else if (width >= MIN_WIDTH_FOR_COLUMNS.TWO) {
    return NUMBER_OF_COLUMNS.TWO;
  } else return NUMBER_OF_COLUMNS.ONE;
};

export const calcItemPosition = function(
  columnHeight,
  columnPosition,
  row,
  col
) {
  const topSpace =
    row === 0
      ? DISTANCE_BETWEEN_ITEM
      : row * DISTANCE_BETWEEN_ITEM + DISTANCE_BETWEEN_ITEM;
  const leftSpace =
    col === 0
      ? DISTANCE_BETWEEN_ITEM
      : col * DISTANCE_BETWEEN_ITEM + DISTANCE_BETWEEN_ITEM;

  return {
    top: columnHeight + topSpace,
    left: columnPosition + leftSpace
  };
};
