import React, { Component } from "react";
import Content from "../Content/Content";
import NotFound from "../NotFound/NotFound";
import { HashRouter as Router, Route, NavLink, Switch } from "react-router-dom";
import { TRENDING, SEARCH, ID } from "../../constant";

class Container extends Component {
  render() {
    console.log(`render ----- Container`);

    const { path } = this.props.match;

    return (
      <Switch>
        <Route path={`${path + TRENDING}/`} component={Content} />
        <Route path={`${path + SEARCH}/:type`} component={Content} />
        <Route path={`${path + ID}/:id`} component={Content} />
        <Route path={`${path}random/`} component={Content} />
        <Route path="/" component={NotFound} />
      </Switch>
    );
  }
}

export default Container;
