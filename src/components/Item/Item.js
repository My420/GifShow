import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./item.scss";
import { ID } from "../../constant";

class Item extends Component {
  render() {
    console.log(`render ----- Item`);
    const { src, title, id, itemType } = this.props;
    return (
      <article className={`app__item app__item--${id} item`}>
        <h2 className="item__title">{title}</h2>
        <h2 className="item__title">{itemType}</h2>
        <Link to={`/${itemType}/${ID}/${id}`}>
          <img className="item__image" src={src.url} alt="rfhnbyrf" />
        </Link>
      </article>
    );
  }
}

export default Item;
