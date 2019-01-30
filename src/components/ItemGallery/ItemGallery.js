import React, { Component } from "react";
import "./itemGallery.scss";
import { connect } from "react-redux";
import GalleryControls from "../GalleryControls/GalleryControls";
import { closeGallery } from "../../ActionCreator/index";
import { ORIGINAL } from "../../constant";
import { calcTagsSize } from "../../utils/utils";

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
    const { isOpen, itemType, url, data, onCloseButtonClick } = this.props;
    let body;

    if (isOpen) {
      let imageWidth = +data.images.original.width;
      let imageHeight = +data.images.original.height;

      const clientWidth = document.documentElement.clientWidth;
      const clientHeight = document.documentElement.clientHeight;

      const galleryComponentsSize = calcTagsSize(
        imageWidth,
        imageHeight,
        clientWidth,
        clientHeight
      );

      const imageWrapperStyle = {
        width: galleryComponentsSize.image.width + `px`,
        height: galleryComponentsSize.image.height + `px`,
        margin: `0 0 ${galleryComponentsSize.margin.image + `px`} 0`
      };

      const galleryStyle = {
        width: galleryComponentsSize.gallery.width + `px`,
        height: galleryComponentsSize.gallery.height + `px`,
        top: galleryComponentsSize.gallery.top + `px`,
        left: galleryComponentsSize.gallery.left + `px`
      };
      const imageStyle = {
        width: galleryComponentsSize.image.width + `px`,
        height: galleryComponentsSize.image.height + `px`
      };

      body = (
        <section className="app__gallery gallery" style={galleryStyle}>
          <h2 className="gallery__title visually-hidden">{data.title}</h2>
          <button
            className="gallery__button gallery__button--close"
            onClick={onCloseButtonClick}
          >
            <span className="visually-hidden">Закрыть</span>
          </button>
          <div className="gallery__screen">
            <div className="gallery__image-wrapper" style={imageWrapperStyle}>
              <img
                className="gallery__image"
                src={this.getImageSrc()}
                alt={data.title}
                style={imageStyle}
              />
            </div>
          </div>
          <GalleryControls
            changeImageSize={this.changeImageSize}
            itemUrl={url}
            itemType={itemType}
          />
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
    isOpen: store.gallery.isGalleryOpen,
    itemType: store.gallery.itemType
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
