import React, { Component } from "react";

import Content from "../Content/Content";
import { HashRouter as Router, Route, NavLink, Switch } from "react-router-dom";
import { TRENDING, SERCH } from "../../constant";

class Container extends Component {
  render() {
    console.log(`render ----- Container`);

    const { path } = this.props.match;

    return (
      <Switch>
        <Route path={`${path + TRENDING}/`} component={Content} />
        <Route path={`${path + SERCH}/:type`} component={Content} />
        <Route path={`${path}random/`} component={Content} />
      </Switch>
    );
  }
}

export default Container;
