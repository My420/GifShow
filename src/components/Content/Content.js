import React, { Component } from "react";
import "./content.scss";
import ItemList from "../ItemList/ItemList";
import ItemGallery from "../ItemGallery/ItemGallery";
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
    const { offset } = this.state;
    const numberOfColumns = this.props.numberOfColumns;

    console.log(`render ----- Content`);
    return (
      <div className="app__item-wrapper">
        <ItemGallery numberOfColumns={numberOfColumns} />
        <ItemList
          url={url}
          offset={offset}
          increaseOffset={this.increaseOffset}
          resetOffset={this.resetOffset}
          numberOfColumns={numberOfColumns}
        />
      </div>
    );
  }
}

export default Content;
