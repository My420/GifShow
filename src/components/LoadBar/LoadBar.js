import React, { Component } from "react";
import PropTypes from "prop-types";
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
    const { isLoading } = this.props;

    return (
      <div
        className={`catalogue__loader-wrapper ${
          !isLoading ? `catalogue__loader--closed` : ``
        }`}
      >
        {this.getBody()}
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    isLoading: store.data.isLoading
  };
};

export default connect(mapStateToProps)(LoadBar);

LoadBar.propTypes = {
  isLoading: PropTypes.bool
};
