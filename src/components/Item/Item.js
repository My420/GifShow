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

    const { itemData, id, position, isAutoplay } = this.props;
    const top = position.top + `px`;
    const left = position.left + `px`;
    const title = itemData.title;
    const src = isAutoplay
      ? itemData.images.fixed_width
      : itemData.images.fixed_width_still;
    return (
      <article
        className={`app__item app__item--${id} item`}
        style={{ top: top, left: left }}
      >
        <h2 className="item__title visually-hidden">{title}</h2>
        <div
          className="item__image-wrapper"
          onClick={this.onUserClick}
          onMouseEnter={null}
        >
          <img className="item__image" src={src.url} alt={title} />
        </div>
      </article>
    );
  }
}

export default Item; /*<Link to={`/${itemType}/${ID}/${id}`}>*/
