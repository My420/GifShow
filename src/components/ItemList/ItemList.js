import React, { Component } from "react";
import "./itemlist.scss";
import Item from "../Item/Item";
import RequestStatusBar from "../RequestStatusBar/RequestStatusBar";
import { connect } from "react-redux";
import { createRequestFromURL, calcItemPosition } from "../../utils/utils";
import {
  loadData,
  changeGalleryItem,
  getFavorite
} from "../../ActionCreator/index";
import {
  DEFAULT_OFFSET_VALUE,
  DISTANCE_BETWEEN_ITEM,
  COLUMN_POSITION,
  FAVORITE,
  MAX_COLUMNS_NUMBER
} from "../../constant";

class ItemList extends Component {
  constructor(props) {
    super(props);
    this.fullColumnHeight = new Array(MAX_COLUMNS_NUMBER).fill(0);
  }
  componentDidMount() {
    console.log(`********** willmount`);
    this.getData(this.props.url, this.props.offset);
  }

  componentWillReceiveProps(nextProps) {
    console.log(`********** resiveprops`);
    if (nextProps.url !== this.props.url) {
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
    this.userRequest = request;
    console.log(`**********`, request);
    if (request.actionType !== FAVORITE) {
      this.props.loadData(request);
    } else {
      this.props.getFavorite(request);
    }
  };

  getBody = (data, isAutoplay) => {
    const { numberOfColumns } = this.props;
    let body = [];
    let columnHeight = new Array(numberOfColumns).fill(0);
    let columnPosition = COLUMN_POSITION[`${numberOfColumns}`].slice(); // клонируем
    let col = 0;
    let row = 0;
    this.fullColumnHeight = this.fullColumnHeight.fill(0); // обнуляем счетчик длины

    for (const key in data) {
      debugger;
      body.push(
        <Item
          itemType={this.userRequest}
          itemData={data[key]}
          id={key}
          key={key}
          onUserClick={this.props.changeGalleryItem}
          isAutoplay={isAutoplay}
          position={calcItemPosition(
            columnHeight[col],
            columnPosition[col],
            row,
            col
          )}
        />
      );

      this.fullColumnHeight[col] =
        this.fullColumnHeight[col] +
        +data[key].images.fixed_width.height +
        DISTANCE_BETWEEN_ITEM;

      columnHeight[col] =
        columnHeight[col] + +data[key].images.fixed_width.height;

      if (col === numberOfColumns - 1) {
        col = 0;
        row++;
      } else {
        col++;
      }
    }

    return body;
  };

  getButtonTopPosition() {
    let newArry = this.fullColumnHeight.slice(); // клонируем массив
    newArry.sort((a, b) => {
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    });

    return `${newArry[newArry.length - 1] + DISTANCE_BETWEEN_ITEM}px`;
  }

  getItemsAmount = (data, itemTotalCount) => {
    if (itemTotalCount === 1) {
      let counter = 0;
      for (var key in data) {
        counter++;
      }
      return counter;
    } else {
      return itemTotalCount;
    }
  };

  render() {
    console.log(`render ----- ItemList`);

    const { isAutoplay, data, increaseOffset } = this.props;
    const {
      isLoading,
      isError,
      currentData,
      errorMessage,
      itemTotalCount
    } = data;

    const itemsAmount = this.getItemsAmount(currentData, itemTotalCount);
    return (
      <section className="app__item-list catalogue">
        <h2 className="visually-hidden">Каталог</h2>
        <RequestStatusBar
          request={this.userRequest}
          itemsAmount={itemsAmount}
          isError={isError}
          errorMessage={errorMessage}
        />
        <div className="catalogue__wrapper">
          {this.getBody(currentData, isAutoplay)}
          <div
            className="catalogue__button-wrapper"
            style={{ top: this.getButtonTopPosition() }}
          >
            <button
              className="catalogue__button catalogue__button--more"
              onClick={increaseOffset}
            >
              More
            </button>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = store => {
  return {
    isAutoplay: store.isAutoplay,
    data: store.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadData: request => {
      dispatch(loadData(request));
    },
    changeGalleryItem: (itemUrl, itemType, itemData) => {
      dispatch(changeGalleryItem(itemUrl, itemType, itemData));
    },
    getFavorite: request => {
      dispatch(getFavorite(request));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemList);
