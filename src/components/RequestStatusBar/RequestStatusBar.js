import React, { Component } from "react";
import PropTypes from "prop-types";
import "./requestStatusBar.scss";
import { TRENDING, RANDOM, SEARCH, ID, FAVORITE } from "../../constant";

class RequestStatusBar extends Component {
  getStatus = (request, itemsAmount) => {
    const { itemType, actionType, payload } = request;
    switch (actionType) {
      case TRENDING: {
        return {
          request: `${actionType} ${itemType}`,
          amount: `${itemsAmount}`
        };
      }
      case SEARCH: {
        return {
          request: `${actionType} "${payload.replace(/\+/g, ` `)}" ${itemType}`,
          amount: `${itemsAmount}`
        };
      }
      case RANDOM: {
        return {
          request: `${actionType} ${
            itemsAmount > 1 ? itemType : itemType.slice(0, -1)
          }`,
          amount: `${itemsAmount}`
        };
      }
      case ID: {
        return {
          request: `${itemType.slice(0, -1)} by ${actionType}`,
          amount: `${itemsAmount}`
        };
      }
      case FAVORITE: {
        return {
          request: `${actionType} ${itemType}`,
          amount: `${itemsAmount}`
        };
      }
      default:
        return null;
    }
  };

  getStatusBody = () => {
    const { request, itemsAmount, isError, errorMessage } = this.props;
    if (isError) {
      return (
        <span className="catalogue__message--error">{`An error has occurred. Try again later. Error:  ${errorMessage}`}</span>
      );
    } else {
      if (request) {
        const status = this.getStatus(request, itemsAmount);
        return (
          <React.Fragment>
            <span className="catalogue__message--request">
              {status.request}
            </span>
            <span className="catalogue__message--amount">{`Amount: ${
              status.amount
            }`}</span>
          </React.Fragment>
        );
      } else {
        return null;
      }
    }
  };

  render() {
    console.log(`render ----- RequestStatusBar`);

    return (
      <div className="catalogue__status-wrapper">
        <p className="catalogue__status">{this.getStatusBody()}</p>
      </div>
    );
  }
}

export default RequestStatusBar;

RequestStatusBar.propTypes = {
  // from ItemList
  request: PropTypes.object,
  itemsAmount: PropTypes.number,
  isError: PropTypes.bool,
  errorMessage: PropTypes.string
};
