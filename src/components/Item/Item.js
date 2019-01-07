import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./item.scss";
import { ID } from "../../constant";

class Item extends Component {
  onUserClick = () => {
    const { itemData, id, itemType } = this.props;
    const itemUrl = `/${itemType}/${ID}/${id}`;
    const dataForGallery = { ...itemData }; // клонируем объект (иммутабельность данных)
    this.props.onUserClick(itemUrl, dataForGallery);
  };
  render() {
    console.log(`render ----- Item`);
    const { itemData, id, itemType, isAutoplay } = this.props;
    const title = itemData.title;
    const src = isAutoplay
      ? itemData.images.fixed_width
      : itemData.images.fixed_width_still;
    return (
      <article className={`app__item app__item--${id} item`}>
        <h2 className="item__title">{title}</h2>
        <h2 className="item__title">{itemType}</h2>
        <div className="item__image-wrapper" onClick={this.onUserClick}>
          <img className="item__image" src={src.url} alt="rfhnbyrf" />
        </div>
      </article>
    );
  }
}

export default Item; /*<Link to={`/${itemType}/${ID}/${id}`}>*/
