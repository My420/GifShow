import React, { Component } from "react";
import "./itemlist.scss";
import Item from "../Item/Item";
import { connect } from "react-redux";
import { createRequestFromURL } from "../../utils/utils";
import { loadData } from "../../ActionCreator/index";
import { DEFAULT_OFFSET_VALUE } from "../../constant";

class ItemList extends Component {
  componentDidMount() {
    console.log(`********** willmount`);
    this.getData(this.props.url, this.props.offset);
  }

  componentWillReceiveProps(nextProps) {
    console.log(`********** resiveprops`);
    if (nextProps.url !== this.props.url) {
      // зарефакторить?
      if (nextProps.offset !== DEFAULT_OFFSET_VALUE) {
        this.props.resetOffset();
      } else {
        this.getData(nextProps.url, nextProps.offset);
      }
    } else if (nextProps.offset !== this.props.offset) {
      this.getData(nextProps.url, nextProps.offset);
    }
  }

  getData = (url, offset) => {
    const request = createRequestFromURL(url, offset);
    this.props.loadData(request);
  };

  render() {
    const { isAutoplay, isLoading, data, offset } = this.props;
    console.log(`render ----- ItemList`);
    return (
      <section className="app__item-list">
        <h1>{isAutoplay ? `ON` : `OFF`}</h1>
        <h2>
          {isLoading
            ? `Загрузка.....`
            : `${data.itemType} + ${data.actionType} + ${offset} + ${
                data.payload
              } `}
        </h2>
        <button
          className="app__more-button"
          onClick={this.props.increaseOffset}
        >
          ЕЩЕ
        </button>
      </section>
    );
  }
}

const mapStateToProps = store => {
  return {
    isAutoplay: store.isAutoplay,
    isLoading: store.data.isLoading,
    data: store.data.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadData: request => {
      dispatch(loadData(request));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemList);
