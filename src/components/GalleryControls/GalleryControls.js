import React, { Component } from "react";
import "./galleryControls.scss";
import {
  ORIGINAL,
  SMALL,
  GALLERY_CONTROLS_HEIGHT,
  GALLERY_CONTROLS_WIDTH,
  STICKERS
} from "../../constant";

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
    console.log(`render ----- GalleryControls`);
    const { sizeValue, onCloseButtonClick, isItemFavorite } = this.props;

    return (
      <section
        className="gallery__controls"
        style={{
          width: GALLERY_CONTROLS_WIDTH + `px`,
          height: GALLERY_CONTROLS_HEIGHT + `px`
        }}
      >
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
              <span>Favorite</span>
              {/*<span
                className={isItemFavorite ? "favorite" : null}
              >{`${String.fromCharCode(10084)} Favorite`}</span>*/}
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
            <span>{`${String.fromCharCode(10060)} Close`}</span>
          </button>
        </div>
      </section>
    );
  }
}

export default GalleryControls;
