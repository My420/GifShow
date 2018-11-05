import React, { Component } from "react";
import "./header.scss";
import SerchBar from "../SerchBar/SerchBar";

class Header extends Component {
  render() {
    console.log(`render ----- Header`);
    return (
      <header className="app__header">
        <h2 className="app__logo">GifShow</h2>
        <SerchBar />
      </header>
    );
  }
}

export default Header;
