import React, { Component } from "react";
import PropTypes from "prop-types";
import "./content.scss";
import ItemList from "../ItemList/ItemList";
import ItemGallery from "../ItemGallery/ItemGallery";
import { DEFAULT_OFFSET_VALUE, INCREASE_OFFSET_VALUE } from "../../constant";

class Content extends Component {
  state = {
    offset: DEFAULT_OFFSET_VALUE
  };

  render() {
    const url = this.props.match.url;
    const { offset } = this.state;
    const numberOfColumns = this.props.numberOfColumns;

    console.log(`render ----- Content`);
    return (
      <div className="app__item-wrapper">
        <ItemGallery numberOfColumns={numberOfColumns} />
        <ItemList url={url} offset={offset} numberOfColumns={numberOfColumns} />
      </div>
    );
  }
}

export default Content;

Content.propTypes = {
  // from React-Router 4
  match: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object,
  // from App
  numberOfColumns: PropTypes.oneOf([1, 2, 3, 4])
};
