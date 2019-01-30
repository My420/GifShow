import React, { Component } from "react";
import "./galleryControls.scss";
import {
  ORIGINAL,
  SMALL,
  GIFS,
  GIFSHOW_HOST,
  GALLERY_CONTROLS_HEIGHT,
  GALLERY_CONTROLS_WIDTH
} from "../../constant";

class GalleryControls extends Component {
  onSelectChange = event => {
    this.props.changeImageSize(event.target.value);
  };

  onCopyButtonClick = event => {
    const url = `${GIFSHOW_HOST + this.props.itemUrl}`;
    document.execCommand(url);
    console.log(url);
  };

  render() {
    console.log(`render ----- GalleryControls`);
    const { sizeValue, itemType, itemUrl } = this.props;
    return (
      <section
        className="gallery__controls"
        style={{
          width: GALLERY_CONTROLS_WIDTH + `px`,
          height: GALLERY_CONTROLS_HEIGHT + `px`
        }}
      >
        <section className="gallery__downloads">
          <select
            className="gallery__size-select"
            name="size"
            value={sizeValue}
            onChange={this.onSelectChange}
          >
            <option className="gallery__size-option" value={ORIGINAL}>
              Большой
            </option>
            <option className="gallery__size-option" value={SMALL}>
              Маленький
            </option>
          </select>
          <button className="gallery__button gallery__button--favorite">
            <span>{`${String.fromCharCode(10084)} Favorite`}</span>
          </button>
          <button
            className="gallery__button gallery__button--copy"
            disabled={itemType === GIFS ? false : true}
            onClick={this.onCopyButtonClick}
          >
            <span>{`${String.fromCharCode(9729)} Copy`}</span>
          </button>
        </section>
      </section>
    );
  }
}

export default GalleryControls;
