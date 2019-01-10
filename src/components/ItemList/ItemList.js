import React, { Component } from "react";
import "./itemlist.scss";
import Item from "../Item/Item";
import { connect } from "react-redux";
import { createRequestFromURL } from "../../utils/utils";
import { loadData, change } from "../../ActionCreator/index";
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
    this.itemType = request.itemType;
    console.log(`**********`, request);
    this.props.loadData(request);
  };

  calcPosition = (columnHeight, columnPosition, row, col) => {
    const topSpace = row === 0 ? 10 : row * 10 + 10;
    const leftSpace = col === 0 ? 10 : col * 10 + 10;

    return {
      top: columnHeight + topSpace,
      left: columnPosition + leftSpace
    };
  };

  getBody = (data, isAutoplay) => {
    let body = [];
    let columnHeight = [0, 0, 0, 0];
    let columnPosition = [0, 200, 400, 600];
    let col = 0;
    let row = 0;

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

      columnHeight[col] =
        columnHeight[col] + +data[key].images.fixed_width.height;

      if (col === 3) {
        col = 0;
        row++;
      } else {
        col++;
      }
    }
    return body;
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
        <h2>Всего итемов: {itemTotalCount}</h2>
        <div className="catalogue__item-wrapper">
          {this.getBody(currentData, isAutoplay)}
        </div>
        <button className="app__more-button" onClick={increaseOffset}>
          ЕЩЕ
        </button>
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
      dispatch(change(itemUrl, itemData));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemList);
