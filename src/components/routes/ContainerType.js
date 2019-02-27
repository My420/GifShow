import React, { Component } from "react";
import PropTypes from "prop-types";
import Container from "../routes/Container";
import { Route, Switch, Redirect } from "react-router-dom";

import { GIFS, STICKERS, TRENDING } from "../../constant";

class ContainerType extends Component {
  render() {
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

ContainerType.propTypes = {
  // from React-Router 4
  match: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object,
  // from App
  numberOfColumns: PropTypes.oneOf([1, 2, 3, 4])
};
