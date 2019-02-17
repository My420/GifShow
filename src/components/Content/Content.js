import React, { Component } from "react";
import "./content.scss";
import ItemList from "../ItemList/ItemList";
import ItemGallery from "../ItemGallery/ItemGallery";
import { DEFAULT_OFFSET_VALUE, INCREASE_OFFSET_VALUE } from "../../constant";
import { defineNumberOfColumns } from "../../utils/utils.js";

class Content extends Component {
  state = {
    offset: 0,
    numberOfColumns: null
  };

  increaseOffset = () => {
    this.setState({ offset: this.state.offset + INCREASE_OFFSET_VALUE });
  };

  resetOffset = () => {
    this.setState({ offset: DEFAULT_OFFSET_VALUE });
  };

  onBrowserSizeChange = evt => {
    const currentBrowserWidth = evt.target.innerWidth;
    this.changeNumberOfColumns(currentBrowserWidth);
  };

  changeNumberOfColumns = width => {
    const newNumber = defineNumberOfColumns(width);
    const prewNumber = this.state.numberOfColumns;
    if (newNumber !== prewNumber) {
      this.setState({ userDevice: newNumber });
    }
  };

  componentDidMount() {
    const browserWidth = document.documentElement.clientWidth;
    this.changeNumberOfColumns(browserWidth);
    window.addEventListener("resize", this.onBrowserSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onBrowserSizeChange);
  }

  render() {
    const url = this.props.match.url;
    const offset = this.state.offset;

    console.log(`render ----- Content`, this.state.userDevice);
    return (
      <div className="app__item-wrapper">
        <ItemGallery />
        <ItemList
          url={url}
          offset={offset}
          increaseOffset={this.increaseOffset}
          resetOffset={this.resetOffset}
        />
      </div>
    );
  }
}

export default Content;
