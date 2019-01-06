import React, { Component } from "react";

import Container from "../routes/Container";
import {
  HashRouter as Router,
  Route,
  NavLink,
  Switch,
  Redirect
} from "react-router-dom";

import { GIFS, STICKERS, TRENDING } from "../../constant";

class ContainerType extends Component {
  render() {
    console.log(`render ----- ContainerType`);

    return (
      <Switch>
        <Route path={`/${GIFS}/`} component={Container} />
        <Route path={`/${STICKERS}/`} component={Container} />
        <Redirect from="*" to={`/${GIFS}/${TRENDING}/`} />
      </Switch>
    );
  }
}

export default ContainerType;
