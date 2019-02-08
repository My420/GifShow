import React, { Component } from "react";
import "./requestStatusBar.scss";
import { calcNewURL, convertUserInput } from "../../utils/utils";
import { TRENDING, RANDOM, SEARCH, ID } from "../../constant";

class RequestStatusBar extends Component {
  getStatus = (request, itemsAmount) => {
    const { itemType, actionType, payload } = request;
    switch (actionType) {
      case TRENDING: {
        return `${actionType} ${itemsAmount} ${itemType} `;
      }
      case SEARCH: {
        return `${actionType} "${payload.replace(
          `+`,
          ` `
        )}" ${itemsAmount} ${itemType} `;
      }
      case RANDOM: {
        return `${RANDOM} ${itemsAmount} ${
          itemsAmount > 1 ? itemType : itemType.slice(0, -1)
        }`;
      }
      case ID: {
        return `${itemType.slice(0, -1)}`;
      }
    }
  };

  getStatusBody = () => {
    const { request, itemsAmount, isError, errorMessage } = this.props;
    if (isError) {
      return `произошла ошибка. попробуйте ещераз ОшибкаЖ ${errorMessage}`;
    } else {
      return request ? this.getStatus(request, itemsAmount) : null;
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
