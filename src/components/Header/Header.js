import React, { Component } from "react";
import "./header.scss";

class Header extends Component {
  render() {
    console.log(`render ----- Header`);
    return (
      <header className="app__header">
        <h2 className="app__logo">GifShow</h2>
        <input className="app__search-field" type="text" placeholder="Поиск" />
        <button className="app__search-button">
          <span>Начать поиск</span>
        </button>
      </header>
    );
  }
}

export default Header;
