import React, { Component } from "react";

import Container from "../routes/Container";
import {
  HashRouter as Router,
  Route,
  NavLink,
  Switch,
  Redirect
} from "react-router-dom";

import { GIF, STICKER, TRENDS } from "../../constant";

class ContainerType extends Component {
  render() {
    console.log(`render ----- ContainerType`);

    return (
      <Switch>
        <Route path={`/${GIF}/`} component={Container} />
        <Route path={`/${STICKER}/`} component={Container} />
        <Redirect from="*" to={`/${GIF}/${TRENDS}/`} />
      </Switch>
    );
  }
}

export default ContainerType;
