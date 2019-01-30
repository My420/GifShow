import React, { Component } from "react";
import "./itemGallery.scss";
import { connect } from "react-redux";
import GalleryControls from "../GalleryControls/GalleryControls";
import { closeGallery } from "../../ActionCreator/index";
import { ORIGINAL } from "../../constant";

class ItemGallery extends Component {
  state = {
    imageSize: ORIGINAL
  };

  changeImageSize = size => {
    this.setState({ imageSize: size });
  };

  getImageSrc = () => {
    const { data } = this.props;
    if (this.state.imageSize === ORIGINAL) {
      return data.images.original_still.url;
    } else {
      return data.images.fixed_width.url;
    }
  };

  getBody = () => {
    const { isOpen, data, onCloseButtonClick } = this.props;
    let body;

    if (isOpen) {
      let imageWrapperWidth = data.images.original.width + `px`;
      let imageWrapperHeight = data.images.original.height + `px`;
      body = (
        <section className="app__gallery gallery">
          <h2 className="gallery__title">{data.title}</h2>
          <button
            className="gallery__button gallery__button--close"
            onClick={onCloseButtonClick}
          >
            <span className="visually-hidden">Закрыть</span>
          </button>
          <div className="gallery__screen">
            <div
              className="gallery__image-wrapper"
              style={{ width: imageWrapperWidth, height: imageWrapperHeight }}
            >
              <img
                className="gallery__image"
                src={this.getImageSrc()}
                alt={data.title}
              />
            </div>
          </div>
          <GalleryControls changeImageSize={this.changeImageSize} />
        </section>
      );
    } else {
      body = null;
    }
    return body;
  };

  render() {
    console.log(`render ----- ItemScreen`);
    return this.getBody();
  }
}

const mapStateToProps = store => {
  return {
    url: store.gallery.itemUrl,
    data: store.gallery.itemData,
    isOpen: store.gallery.isGalleryOpen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCloseButtonClick: () => {
      dispatch(closeGallery());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemGallery);
