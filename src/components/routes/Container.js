import React, { Component } from "react";
import Content from "../Content/Content";
import NotFound from "../NotFound/NotFound";
import { HashRouter as Router, Route, NavLink, Switch } from "react-router-dom";
import { TRENDING, SEARCH, ID, FAVORITE, RANDOM } from "../../constant";

class Container extends Component {
  render() {
    console.log(`render ----- Container`);

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
