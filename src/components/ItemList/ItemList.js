import React, { Component } from "react";
import "./itemlist.scss";
import Item from "../Item/Item";

class ItemList extends Component {
  render() {
    console.log(`render ----- ItemList`);
    return (
      <section className="app__item-list">
        <Item />
        <Item />
        <Item />
      </section>
    );
  }
}

export default ItemList;
