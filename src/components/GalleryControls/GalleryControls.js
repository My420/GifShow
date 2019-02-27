import React, { Component } from "react";
import PropTypes from "prop-types";
import "./galleryControls.scss";
import { ORIGINAL, SMALL, STICKERS } from "../../constant";

class GalleryControls extends Component {
  onSelectChange = event => {
    this.props.changeImageSize(event.target.value);
  };

  onCopyButtonClick = event => {
    this.props.onCopyButtonClick();
  };

  onFavoriteButtonClick = event => {
    const { isItemFavorite } = this.props;
    this.props.onFavoriteButtonClick(isItemFavorite);
  };

  isCopyButtonDisabled = () => {
    const { itemType, isCopyBarOpen } = this.props;
    if (itemType === STICKERS || isCopyBarOpen) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const { sizeValue, onCloseButtonClick, isItemFavorite, style } = this.props;

    return (
      <section className="gallery__controls" style={style}>
        <div className="gallery__controls-wrapper">
          <select
            className="gallery__size-select"
            name="size"
            value={sizeValue}
            onChange={this.onSelectChange}
          >
            <option className="gallery__size-option" value={ORIGINAL}>
              Original
            </option>
            <option className="gallery__size-option" value={SMALL}>
              Small
            </option>
          </select>
          <div className="gallery__controls-inner">
            <button
              className="gallery__button gallery__button--favorite"
              onClick={this.onFavoriteButtonClick}
            >
              <span
                className={`gallery__icon gallery__icon--heart ${
                  isItemFavorite ? "gallery__icon--favorite" : null
                }`}
              />
              <span className="gallery__name gallery__name--favorite">
                Favorite
              </span>
            </button>
            <button
              className="gallery__button gallery__button--copy"
              disabled={this.isCopyButtonDisabled()}
              onClick={this.onCopyButtonClick}
            >
              <span>{`${String.fromCharCode(9729)} Copy`}</span>
            </button>
          </div>
          <button
            className="gallery__button gallery__button--close"
            onClick={onCloseButtonClick}
          >
            <span>{`X `}</span>
            <span className="gallery__name gallery__name--close">{`Close`}</span>
          </button>
        </div>
      </section>
    );
  }
}

export default GalleryControls;

GalleryControls.propTypes = {
  // from ItemGallery
  changeImageSize: PropTypes.func,
  itemUrl: PropTypes.string,
  itemType: PropTypes.string,
  sizeValue: PropTypes.string,
  onCloseButtonClick: PropTypes.func,
  onCopyButtonClick: PropTypes.func,
  onFavoriteButtonClick: PropTypes.func,
  isCopyBarOpen: PropTypes.bool,
  isItemFavorite: PropTypes.bool,
  style: PropTypes.object
};
