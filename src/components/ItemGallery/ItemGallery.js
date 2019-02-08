import React, { Component } from "react";
import "./itemGallery.scss";
import { connect } from "react-redux";
import GalleryControls from "../GalleryControls/GalleryControls";
import GalleryCopyBar from "../GalleryCopyBar/GalleryCopyBar";
import { closeGallery } from "../../ActionCreator/index";
import { ORIGINAL, ESC_KEY_NAME, GIFSHOW_HOST } from "../../constant";
import { calcGalleryTagStyle } from "../../utils/utils";

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
      return data.images.original_still.url;
    } else {
      return data.images.fixed_width.url;
    }
  };

  onKeyDown = evt => {
    if (evt.key === ESC_KEY_NAME) {
      this.props.onCloseButtonClick();
    }
  };

  showCopyBar = () => {
    this.setState({ isCopyBarOpen: true });
  };

  hideCopyBar = () => {
    this.setState({ isCopyBarOpen: false });
  };

  getBody = () => {
    const { isOpen, itemType, url, data, onCloseButtonClick } = this.props;
    let body;

    if (isOpen) {
      const itemLink = `${GIFSHOW_HOST + url}`;
      const imageSizeType = this.state.imageSize;

      const tagStyle = calcGalleryTagStyle(data, imageSizeType);

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
          <div className="gallery__screen">
            <GalleryCopyBar
              itemLink={itemLink}
              isCopyBarOpen={this.state.isCopyBarOpen}
              onCloseButtonClick={this.hideCopyBar}
            />
            <div
              className="gallery__image-wrapper"
              style={tagStyle.imageWrapper}
            >
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
            isCopyBarOpen={this.state.isCopyBarOpen}
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
    console.log(this.state.imageSize);
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
