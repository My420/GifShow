import React, { Component } from "react";
import "./itemlist.scss";
import Item from "../Item/Item";
import { connect } from "react-redux";
import { createRequestFromURL } from "../../utils/utils";
import { loadData, changeGalleryItem } from "../../ActionCreator/index";
import {
  DEFAULT_OFFSET_VALUE,
  DISTANCE_BETWEEN_ITEM,
  COLUMN_AMOUNT,
  COLUMN_POSITION,
  RANDOM
} from "../../constant";

class ItemList extends Component {
  constructor(props) {
    super(props);
    this.fullColumnHeight = new Array(COLUMN_AMOUNT["PC"]).fill(0);
  }
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
    this.itemType = request.itemType;
    console.log(`**********`, request);
    this.props.loadData(request);
  };

  calcPosition = (columnHeight, columnPosition, row, col) => {
    const topSpace =
      row === 0
        ? DISTANCE_BETWEEN_ITEM
        : row * DISTANCE_BETWEEN_ITEM + DISTANCE_BETWEEN_ITEM;
    const leftSpace =
      col === 0
        ? DISTANCE_BETWEEN_ITEM
        : col * DISTANCE_BETWEEN_ITEM + DISTANCE_BETWEEN_ITEM;

    return {
      top: columnHeight + topSpace,
      left: columnPosition + leftSpace
    };
  };

  getBody = (data, isAutoplay) => {
    let body = [];
    let columnHeight = new Array(COLUMN_AMOUNT["PC"]).fill(0);
    let columnPosition = COLUMN_POSITION["PC"].slice(); // клонируем
    let col = 0;
    let row = 0;
    this.fullColumnHeight = this.fullColumnHeight.fill(0); // обнуляем счетчик длины

    for (const key in data) {
      body.push(
        <Item
          itemType={this.itemType}
          itemData={data[key]}
          id={key}
          key={key}
          onUserClick={this.props.changeGalleryItem}
          isAutoplay={isAutoplay}
          position={this.calcPosition(
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

      if (col === COLUMN_AMOUNT["PC"] - 1) {
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
      errorMassage,
      itemTotalCount
    } = data;

    return (
      <section className="app__item-list catalogue">
        <h1>{isAutoplay ? `ON` : `OFF`}</h1>
        <h2>{isLoading ? `Загрузка.....` : `Отображение`}</h2>
        <h2>{isError ? `Возникла Ошибка: '${errorMassage}' ` : null}</h2>
        <h2>
          Всего итемов: {this.getItemsAmount(currentData, itemTotalCount)}
        </h2>
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
              ЕЩЕ
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
    changeGalleryItem: (itemUrl, itemData) => {
      dispatch(changeGalleryItem(itemUrl, itemData));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemList);
