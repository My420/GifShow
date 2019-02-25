import React, { Component } from "react";
import PropTypes from "prop-types";
import "./galleryCopyBar.scss";

class GalleryCopyBar extends Component {
  onInputClick = event => {
    event.target.select();
  };

  onCloseButtonClick = event => {
    this.props.onCloseButtonClick();
  };

  render() {
    console.log(`render ----- GalleryCopyBar`, this.props);

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
            <span>X </span>
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

GalleryCopyBar.propTypes = {
  //from ItemGallery
  isCopyBarOpen: PropTypes.bool,
  itemLink: PropTypes.string,
  onCloseButtonClick: PropTypes.func
};
