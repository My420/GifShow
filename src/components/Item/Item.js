import React, { Component } from "react";
import "./item.scss";

class Item extends Component {
  render() {
    console.log(`render ----- Item`);
    return (
      <article className="app__item item">
        <a href="/art" className="item__ref">
          <img
            className="item__image"
            src="http://placehold.it/500x300"
            alt="rfhnbyrf"
          />
        </a>
      </article>
    );
  }
}

export default Item;
