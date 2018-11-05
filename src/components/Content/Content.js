import React, { Component } from "react";
import "./content.scss";
import ItemList from "../ItemList/ItemList";
import { connect } from "react-redux";

class Content extends Component {
  render() {
    const { path } = this.props.match;
    const { isAutoplay } = this.props;
    console.log(`render ----- Content`);
    return <ItemList isAutoplay={isAutoplay} />;
  }
}

const mapStateToProps = store => {
  return {
    isAutoplay: store.isAutoplay
  };
};

export default connect(mapStateToProps)(Content);
