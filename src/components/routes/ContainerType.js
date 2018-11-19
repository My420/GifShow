import React, { Component } from "react";

import Container from "../routes/Container";
import {
  HashRouter as Router,
  Route,
  NavLink,
  Switch,
  Redirect
} from "react-router-dom";

import { GIFS, STICKER, TRENDING } from "../../constant";

class ContainerType extends Component {
  render() {
    console.log(`render ----- ContainerType`);

    return (
      <Switch>
        <Route path={`/${GIFS}/`} component={Container} />
        <Route path={`/${STICKER}/`} component={Container} />
        <Redirect from="*" to={`/${GIFS}/${TRENDING}/`} />
      </Switch>
    );
  }
}

export default ContainerType;
