import React, { Component } from "react";
import PropTypes from "prop-types";
import "./notFound.scss";
import { NavLink } from "react-router-dom";
import { HOME_PAGE } from "../../constant";
import { withRouter } from "react-router";

class NotFound extends Component {
  render() {
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

NotFound.propTypes = {
  // from React-Router 4
  match: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object
};
