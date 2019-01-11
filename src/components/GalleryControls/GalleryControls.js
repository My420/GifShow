import React, { Component } from "react";
import "./galleryControls.scss";
import { connect } from "react-redux";
import { createRequestFromURL } from "../../utils/utils";
import { loadData, change } from "../../ActionCreator/index";
import { ORIGINAL, SMALL } from "../../constant";

class GalleryControls extends Component {
  onSelectChange = event => {
    this.props.changeImageSize(event.target.value);
  };

  render() {
    console.log(`render ----- GalleryControls`);
    const { sizeValue } = this.props;
    return (
      <section className="gallery__controls">
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
        </section>
      </section>
    );
  }
}

export default GalleryControls;
