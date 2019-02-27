import React, { Component } from "react";
import PropTypes from "prop-types";
import "./controls.scss";
import Navigation from "../Navigation/Navigation";
import Option from "../Option/Option";
import LoadBar from "../LoadBar/LoadBar";
import { NUMBER_OF_COLUMNS } from "../../constant";

class Controls extends Component {
  state = {
    isMenuOpen: true
  };

  changeMenuStatus = () => {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.numberOfColumns < NUMBER_OF_COLUMNS.FOUR) {
      this.setState({ isMenuOpen: false });
    } else {
      this.setState({ isMenuOpen: true });
    }
  }

  render() {
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

Controls.propTypes = {
  numberOfColumns: PropTypes.oneOf([1, 2, 3, 4])
};
