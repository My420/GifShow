import React, { Component } from "react";
import PropTypes from "prop-types";
import "./searchbar.scss";
import { withRouter } from "react-router";
import { calcNewURL, convertUserInput } from "../../utils/utils";
import { SEARCH, ENTER_KEY_NAME } from "../../constant";

class SerchBar extends Component {
  state = {
    userInputValue: "",
    isInputEmpty: true
  };

  onInputChange = evt => {
    const isInputEmpty = evt.target.value === `` ? true : false;
    this.setState({
      userInputValue: evt.target.value,
      isInputEmpty: isInputEmpty
    });
  };

  onSerchButtonClick = evt => {
    const serchText = convertUserInput(this.state.userInputValue);
    const path = SEARCH;
    const currentUrl = this.props.history.location.pathname;
    const newURL = calcNewURL(currentUrl, path, serchText);
    if (newURL && newURL !== currentUrl) this.props.history.push(newURL);
  };

  onKeyDown = evt => {
    if (evt.key === ENTER_KEY_NAME) {
      this.onSerchButtonClick();
    }
  };

  render() {
    return (
      <React.Fragment>
        <input
          className="app__search-field"
          type="text"
          placeholder="Search all the GIFs and Stickers"
          value={this.state.userInputValue}
          onChange={this.onInputChange}
          onKeyDown={this.onKeyDown}
        />
        <button
          className="app__search-button"
          onClick={this.onSerchButtonClick}
          disabled={this.state.isInputEmpty}
        >
          <span className="visually-hidden">Find</span>
        </button>
      </React.Fragment>
    );
  }
}

export default withRouter(SerchBar);

SerchBar.propTypes = {
  // from React-Router 4
  match: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object
};
