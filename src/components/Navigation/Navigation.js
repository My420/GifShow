import React, { Component } from "react";
import "./navigation.scss";
import { HashRouter as Router, Route, NavLink } from "react-router-dom";
import { calcNewURL } from "../../utils/utils";
import { TRENDING, RANDOM, FAVORITE } from "../../constant";
import { withRouter } from "react-router";

class Navigation extends Component {
  onNavButtonClick = evt => {
    const path = evt.target.dataset.path;
    const currentUrl = this.props.history.location.pathname;
    const newURL = calcNewURL(currentUrl, path);
    if (newURL && newURL !== currentUrl) this.props.history.push(newURL);
  };

  render() {
    console.log(`render ----- Navigation`);
    return (
      <nav className="app__navigation navigation">
        <h2 className="visually-hidden">Навигация</h2>
        <button
          className="navigation__button navigation__button--trends"
          data-path={TRENDING}
          onClick={this.onNavButtonClick}
        >
          Popular
        </button>
        <button
          className="navigation__button navigation__button--random"
          data-path={RANDOM}
          onClick={this.onNavButtonClick}
        >
          Random
        </button>
        <button
          className="navigation__button navigation__button--favorite"
          data-path={FAVORITE}
          onClick={this.onNavButtonClick}
        >
          Favorite
        </button>
        <NavLink
          to="/about/"
          className="navigation__button navigation__button--about"
        >
          About
        </NavLink>
      </nav>
    );
  }
}

export default withRouter(Navigation);
