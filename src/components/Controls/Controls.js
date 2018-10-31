import React, { Component } from "react";
import "./controls.scss";
import Navigation from "../Navigation/Navigation";
import Option from "../Option/Option";

class Controls extends Component {
  render() {
    console.log(`render ----- Controls`);
    return (
      <section className="app__controls">
        <h2 className="visually-hidden">Управление</h2>
        <Navigation />
        <Option />
      </section>
    );
  }
}

export default Controls;
