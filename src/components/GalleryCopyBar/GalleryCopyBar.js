import React, { Component } from "react";
import "./galleryCopyBar.scss";
import {
  ORIGINAL,
  SMALL,
  GIFS,
  GIFSHOW_HOST,
  GALLERY_CONTROLS_HEIGHT,
  GALLERY_CONTROLS_WIDTH
} from "../../constant";

class GalleryCopyBar extends Component {
  onInputClick = event => {
    event.target.select();
  };

  onCloseButtonClick = event => {
    this.props.onCloseButtonClick();
  };

  render() {
    console.log(`render ----- GalleryCopyBar`);

    const { isCopyBarOpen, itemLink } = this.props;
    if (isCopyBarOpen) {
      return (
        <section className="gallery__copy-bar copyBar">
          <h2 className="visually-hidden">Copy Bar</h2>
          <div className="copyBar__inner">
            <label className="copyBar__label" htmlFor="copy">
              Link
            </label>
            <input
              type="text"
              id="copy"
              className="copyBar__input"
              defaultValue={itemLink}
              onClick={this.onInputClick}
            />
          </div>
          <button
            className="copyBar__button copyBar__button--close"
            onClick={this.onCloseButtonClick}
          >
            {`X`}
            <span className="visually-hidden">Close Copy Bar</span>
          </button>
        </section>
      );
    } else {
      return null;
    }
  }
}

export default GalleryCopyBar;
