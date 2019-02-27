import React, { Component } from "react";
import PropTypes from "prop-types";
import "./itemGallery.scss";
import { connect } from "react-redux";
import GalleryControls from "../GalleryControls/GalleryControls";
import GalleryCopyBar from "../GalleryCopyBar/GalleryCopyBar";
import {
  closeGallery,
  deleteItemFromFavorite,
  addItemToFavorite
} from "../../ActionCreator/index";
import { ORIGINAL, ESC_KEY_NAME, GIFSHOW_HOST } from "../../constant";
import { calcGalleryTagStyle, includeFavoriteItemId } from "../../utils/utils";

class ItemGallery extends Component {
  state = {
    imageSize: ORIGINAL,
    isCopyBarOpen: false
  };

  changeImageSize = size => {
    this.setState({ imageSize: size });
  };

  getImageSrc = () => {
    const { data } = this.props;
    if (this.state.imageSize === ORIGINAL) {
      return data.images.original.url;
    } else {
      return data.images.fixed_width.url;
    }
  };

  onKeyDown = evt => {
    if (evt.key === ESC_KEY_NAME) {
      this.props.onCloseButtonClick();
    }
  };

  changeItemStatus = isItemFavorite => {
    const data = this.props.data;
    const itemType = this.props.itemType;
    this.props.changeItemStatus(isItemFavorite, data, itemType);
  };

  showCopyBar = () => {
    this.setState({ isCopyBarOpen: true });
  };

  hideCopyBar = () => {
    this.setState({ isCopyBarOpen: false });
  };

  learnIsItemFavorite = () => {
    const { data, favorite, itemType } = this.props;
    return includeFavoriteItemId(data.id, itemType, favorite);
  };

  getBody = () => {
    const {
      isOpen,
      itemType,
      url,
      data,
      onCloseButtonClick,
      numberOfColumns
    } = this.props;
    let body;

    if (isOpen) {
      const itemLink = `${GIFSHOW_HOST + url}`;
      const imageSizeType = this.state.imageSize;

      const tagStyle = calcGalleryTagStyle(
        data,
        imageSizeType,
        numberOfColumns
      );

      body = (
        <section
          className="app__gallery gallery"
          style={tagStyle.gallery}
          tabIndex="0"
          ref={gallery => {
            gallery && gallery.focus();
          }}
          onKeyDown={this.onKeyDown}
        >
          <h2 className="gallery__title visually-hidden">{data.title}</h2>
          <div className="gallery__inner" style={tagStyle.inner}>
            <div className="gallery__screen" style={tagStyle.screen}>
              <GalleryCopyBar
                itemLink={itemLink}
                isCopyBarOpen={this.state.isCopyBarOpen}
                onCloseButtonClick={this.hideCopyBar}
              />
              <div className="gallery__image-wrapper" style={tagStyle.image}>
                <img
                  className="gallery__image"
                  src={this.getImageSrc()}
                  alt={data.title}
                  style={tagStyle.image}
                />
              </div>
            </div>
            <GalleryControls
              changeImageSize={this.changeImageSize}
              itemUrl={url}
              itemType={itemType}
              sizeValue={this.state.imageSize}
              onCloseButtonClick={onCloseButtonClick}
              onCopyButtonClick={this.showCopyBar}
              onFavoriteButtonClick={this.changeItemStatus}
              isCopyBarOpen={this.state.isCopyBarOpen}
              isItemFavorite={this.learnIsItemFavorite()}
              style={tagStyle.controls}
            />
          </div>
        </section>
      );
    } else {
      body = null;
    }
    return body;
  };

  render() {
    return this.getBody();
  }
}

const mapStateToProps = store => {
  return {
    url: store.gallery.itemUrl,
    data: store.gallery.itemData,
    isOpen: store.gallery.isGalleryOpen,
    itemType: store.gallery.itemType,
    favorite: store.favorite
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCloseButtonClick: () => {
      dispatch(closeGallery());
    },
    changeItemStatus: (isItemFavorite, data, itemType) => {
      if (isItemFavorite) {
        dispatch(deleteItemFromFavorite(data, itemType));
      } else {
        dispatch(addItemToFavorite(data, itemType));
      }
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemGallery);

ItemGallery.propTypes = {
  // from Connect
  url: PropTypes.string,
  data: PropTypes.object,
  isOpen: PropTypes.bool,
  itemType: PropTypes.string,
  favorite: PropTypes.object,
  onCloseButtonClick: PropTypes.func,
  changeItemStatus: PropTypes.func,
  //from Contant
  numberOfColumns: PropTypes.oneOf([1, 2, 3, 4])
};
