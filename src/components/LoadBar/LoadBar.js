import React, { Component } from "react";
import "./loadBar.scss";
import { connect } from "react-redux";

class LoadBar extends Component {
  getBody = () => {
    const { isLoading } = this.props;
    if (isLoading) {
      return (
        <span className="loader">
          <span className="loader-inner" />
        </span>
      );
    }
    return null;
  };

  render() {
    console.log(`render ----- Load-Bar`);

    return <div className="catalogue__loader-wrapper">{this.getBody()}</div>;
  }
}

const mapStateToProps = store => {
  return {
    isLoading: store.data.isLoading
  };
};

export default connect(mapStateToProps)(LoadBar);
