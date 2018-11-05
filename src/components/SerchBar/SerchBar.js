import React, { Component } from "react";
import "./serchbar.scss";
import { withRouter } from "react-router";
import { calcNewURL } from "../../utils/utils";
import { SERCH } from "../../constant";

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
    console.log(this.state.userInputValue);

    const path = evt.target.dataset.path;
    const currentUrl = this.props.history.location.pathname;
    const newURL = calcNewURL(currentUrl, path, this.state.userInputValue);
    if (newURL && newURL !== currentUrl) this.props.history.push(newURL);
  };

  render() {
    console.log(`render ----- SerchBar`);
    return (
      <React.Fragment>
        <input
          className="app__search-field"
          type="text"
          placeholder="Поиск"
          value={this.state.userInputValue}
          onChange={this.onInputChange}
        />
        <button
          className="app__search-button"
          data-path={SERCH}
          onClick={this.onSerchButtonClick}
          disabled={this.state.isInputEmpty}
        >
          <span className="visually-hidden">Начать поиск</span>
        </button>
      </React.Fragment>
    );
  }
}

export default withRouter(SerchBar);
