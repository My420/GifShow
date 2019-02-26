import React, { Component } from "react";
import PropTypes from "prop-types";
import "./item.scss";
import { ID, ENTER_KEY_NAME } from "../../constant";

class Item extends Component {
  state = {
    isMouseOnItem: false
  };

  onUserClick = () => {
    const { itemData, id, itemType } = this.props;
    const currentItemType = itemType.itemType;
    const itemUrl = `/${currentItemType}/${ID}/${id}`;
    const dataForGallery = { ...itemData };
    this.props.onUserClick(itemUrl, currentItemType, dataForGallery);
  };

  onMouseEnter = () => {
    this.setState({ isMouseOnItem: true });
  };

  onMouseLeave = () => {
    this.setState({ isMouseOnItem: false });
  };

  onKeyPress = event => {
    if (event.key === ENTER_KEY_NAME) {
      this.onUserClick();
    }
  };

  shouldComponentUpdate(nextProps, nextState, nextContent) {
    if (this.props.id === nextProps.id) {
      if (this.props.isAutoplay === nextProps.isAutoplay) {
        if (this.state.isMouseOnItem === nextState.isMouseOnItem) {
          return false;
        }
      }
    }
    return true;
  }

  render() {
    console.log(`render ----- Item`);

    const { itemData, id, position, isAutoplay } = this.props;
    const top = position.top + `px`;
    const left = position.left + `px`;
    const title = itemData.title;
    const imageWidth = itemData.images.fixed_width.width + `px`;
    const imageHeight = itemData.images.fixed_width.height + `px`;
    let src;

    if (isAutoplay) {
      src = itemData.images.fixed_width;
    } else {
      src = this.state.isMouseOnItem
        ? itemData.images.fixed_width
        : itemData.images.fixed_width_still;
    }

    return (
      <article
        className={`app__item app__item--${id} item`}
        style={{ top: top, left: left }}
        tabIndex="0"
        onKeyPress={this.onKeyPress}
      >
        <h2 className="item__title visually-hidden">{title}</h2>
        <div
          className="item__image-wrapper"
          onClick={this.onUserClick}
          onMouseEnter={isAutoplay ? null : this.onMouseEnter}
          onMouseLeave={isAutoplay ? null : this.onMouseLeave}
        >
          <img
            className="item__image"
            src={src.url}
            alt={title}
            style={{ width: imageWidth, height: imageHeight }}
          />
        </div>
      </article>
    );
  }
}

export default Item;

Item.propTypes = {
  // from ItemList
  itemType: PropTypes.object,
  itemData: PropTypes.object,
  id: PropTypes.string,
  onUserClick: PropTypes.func,
  isAutoplay: PropTypes.bool,
  position: PropTypes.object
};
