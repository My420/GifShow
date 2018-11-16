import React, { Component } from "react";
import "./itemlist.scss";
import Item from "../Item/Item";

class ItemList extends Component {
  render() {
    const { isAutoplay, isLoading, data, offset } = this.props;
    console.log(`render ----- ItemList`);
    return (
      <section className="app__item-list">
        <h1>{isAutoplay ? `ON` : `OFF`}</h1>
        <h2>
          {isLoading
            ? `Загрузка.....`
            : `${data.itemType} + ${data.actionType}+ ${data.payload} `}
        </h2>
        <button className="app__more-button">ЕЩЕ</button>
      </section>
    );
  }
}

export default ItemList;
