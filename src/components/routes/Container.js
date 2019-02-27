import React, { Component } from "react";
import Content from "../Content/Content";
import NotFound from "../NotFound/NotFound";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
import { TRENDING, SEARCH, ID, FAVORITE, RANDOM } from "../../constant";

class Container extends Component {
  render() {
    const { path } = this.props.match;

    const { numberOfColumns } = this.props;

    const WrappedContent = function(props) {
      return <Content {...props} numberOfColumns={numberOfColumns} />;
    };

    return (
      <Switch>
        <Route path={`${path + TRENDING}/`} component={WrappedContent} />
        <Route path={`${path + SEARCH}/:type`} component={WrappedContent} />
        <Route path={`${path + ID}/:id`} component={WrappedContent} />
        <Route path={`${path + RANDOM}/`} component={WrappedContent} />
        <Route path={`${path + FAVORITE}/`} component={WrappedContent} />
        <Route path="/" component={NotFound} />
      </Switch>
    );
  }
}

export default Container;

Container.propTypes = {
  // from React-Router 4
  match: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object,
  // from App
  numberOfColumns: PropTypes.oneOf([1, 2, 3, 4])
};
