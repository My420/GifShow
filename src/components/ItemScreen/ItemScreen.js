import React, { Component } from "react";
import "./itemScreen.scss";
import { connect } from "react-redux";
import { createRequestFromURL } from "../../utils/utils";
import { loadData, change } from "../../ActionCreator/index";
import { DEFAULT_OFFSET_VALUE } from "../../constant";

class ItemScreen extends Component {
  render() {
    console.log(`render ----- ItemScreen`);

    return (
      <section className="app__item-screen screen">
        <h2>{this.props.url}</h2>
        <div>
          <img
            className="screen__image"
            src={this.props.item.url}
            alt="rfhnbyrf"
          />
        </div>
      </section>
    );
  }
}

const mapStateToProps = store => {
  return {
    url: store.screen.itemUrl,
    item: store.screen.item
  };
};

const mapDispatchToProps = dispatch => {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemScreen);
