import React, { Component } from "react";
import "./header.scss";
import SearchBar from "../SearchBar/SearchBar";

class Header extends Component {
  render() {
    console.log(`render ----- Header`);
    return (
      <header className="app__header">
        <h2 className="app__logo">GifShow</h2>
        <SearchBar />
      </header>
    );
  }
}

export default Header;
