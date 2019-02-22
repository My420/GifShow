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
    const { numberOfColumns } = this.props;

    const WrappedContainer = function(props) {
      return <Container {...props} numberOfColumns={numberOfColumns} />;
    };

    return (
      <Switch>
        <Route path={`/${GIFS}/`} component={WrappedContainer} />
        <Route path={`/${STICKERS}/`} component={WrappedContainer} />
        <Redirect from="*" to={`/${GIFS}/${TRENDING}/`} />
      </Switch>
    );
  }
}

export default ContainerType;
