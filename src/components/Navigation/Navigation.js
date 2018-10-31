import React, { Component } from "react";
import "./navigation.scss";

class Navigation extends Component {
  render() {
    console.log(`render ----- Navigation`);
    return (
      <nav className="app__navigation">
        <h2 className="visually-hidden">Навигация</h2>
        <button>Popular</button>
        <button>Random</button>
        <button>About</button>
      </nav>
    );
  }
}

export default Navigation;
