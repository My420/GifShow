import React, { Component } from "react";
import PropTypes from "prop-types";
import "./content.scss";
import ItemList from "../ItemList/ItemList";
import ItemGallery from "../ItemGallery/ItemGallery";
import { DEFAULT_OFFSET_VALUE } from "../../constant";

class Content extends Component {
  constructor(props) {
    super(props);
    this.offset = DEFAULT_OFFSET_VALUE;
  }

  render() {
    const url = this.props.match.url;
    const numberOfColumns = this.props.numberOfColumns;

    return (
      <div className="app__item-wrapper">
        <ItemGallery numberOfColumns={numberOfColumns} />
        <ItemList
          url={url}
          offset={this.offset}
          numberOfColumns={numberOfColumns}
        />
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
