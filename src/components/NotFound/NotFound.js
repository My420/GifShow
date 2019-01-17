import React, { Component } from "react";
import "./notFound.scss";
import { HashRouter as Router, Route, NavLink } from "react-router-dom";
import { HOME_PAGE } from "../../constant";
import { withRouter } from "react-router";

class NotFound extends Component {
  render() {
    console.log(`render ----- NotFound`);
    return (
      <article className="app__404 notFoundPage">
        <h2 className="notFoundPage__title">Ошибка</h2>

        <NavLink to={HOME_PAGE} className="notFoundPage__button">
          Домой
        </NavLink>
      </article>
    );
  }
}

export default withRouter(NotFound);
