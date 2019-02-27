import React, { Component } from "react";
import "./header.scss";
import SearchBar from "../SearchBar/SearchBar";

class Header extends Component {
  render() {
    return (
      <header className="app__header">
        <a className="app__logo-link" href="/#/gifs/trending/">
          <h2 className="app__logo">GifShow</h2>
        </a>
        <SearchBar />
      </header>
    );
  }
}

export default Header;
