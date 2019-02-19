import React, { Component } from "react";
import "./controls.scss";
import Navigation from "../Navigation/Navigation";
import Option from "../Option/Option";
import LoadBar from "../LoadBar/LoadBar";

class Controls extends Component {
  state = {
    isMenuOpen: false
  };

  changeMenuStatus = () => {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  };
  render() {
    console.log(`render ----- Controls`);
    const { isMenuOpen } = this.state;
    return (
      <section className="app__controls controls">
        <h2 className="visually-hidden">Controls</h2>
        <div className="controls__toggle-wrapper">
          <button
            className={`controls__toggle ${
              isMenuOpen ? "controls__toggle--close" : "controls__toggle--open"
            }`}
            onClick={this.changeMenuStatus}
          >
            <span className="visually-hidden">Toggle Menu</span>
          </button>
          <p className="controls__text">Menu</p>
        </div>
        {isMenuOpen ? <Navigation /> : null}
        {isMenuOpen ? <Option /> : null}
        <LoadBar />
      </section>
    );
  }
}

export default Controls;
