import React, { Component } from "react";
import "./content.scss";
import ItemList from "../ItemList/ItemList";
import { DEFAULT_OFFSET_VALUE, INCREASE_OFFSET_VALUE } from "../../constant";

class Content extends Component {
  state = {
    offset: 0
  };

  increaseOffset = () => {
    this.setState({ offset: this.state.offset + INCREASE_OFFSET_VALUE });
  };

  resetOffset = () => {
    this.setState({ offset: DEFAULT_OFFSET_VALUE });
  };

  render() {
    const url = this.props.match.url;
    const offset = this.state.offset;

    console.log(`render ----- Content`);
    return (
      <ItemList
        url={url}
        offset={offset}
        increaseOffset={this.increaseOffset}
        resetOffset={this.resetOffset}
      />
    );
  }
}

export default Content;
