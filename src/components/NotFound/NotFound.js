import React, { Component } from "react";
import "./notFound.scss";
import { HashRouter as Router, Route, NavLink } from "react-router-dom";
import { HOME_PAGE } from "../../constant";
import { withRouter } from "react-router";

class NotFound extends Component {
  render() {
    console.log(`render ----- NotFound`);
    return (
      <section className="app__404 page404">
        <h2 className="visually-hidden">Page not found</h2>
        <p className="page404__message">
          <span className="page404__number">404</span>
          <br />
          <span className="page404__text">Page Not Found</span>
        </p>
        <NavLink to={HOME_PAGE} className="page404__button">
          Home
        </NavLink>
      </section>
    );
  }
}

export default withRouter(NotFound);
