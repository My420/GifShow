import React, { Component } from "react";
import "./item.scss";

class Item extends Component {
  render() {
    console.log(`render ----- Item`);
    const { src, title, id } = this.props;
    return (
      <article className={`app__item app__item--${id} item`}>
        <h2 className="item__title">{title}</h2>
        <a href="/art" className="item__ref">
          <img className="item__image" src={src.url} alt="rfhnbyrf" />
        </a>
      </article>
    );
  }
}

export default Item;
