import React, { Component } from "react";
import "./option.scss";
import { HashRouter as Router, Route, NavLink } from "react-router-dom";
import { GIFS, STICKERS } from "../../constant";
import { withRouter } from "react-router";
import { calcNewURL } from "../../utils/utils";
import { connect } from "react-redux";
import { isAbsolute } from "path";
import { setAutoplay } from "../../ActionCreator/index.js";

class Option extends Component {
  onNavButtonClick = evt => {
    const path = evt.target.dataset.path;
    const currentUrl = this.props.history.location.pathname;
    const newURL = calcNewURL(currentUrl, path);
    if (newURL && newURL !== currentUrl) this.props.history.push(newURL);
  };

  onRadioButtonChange = evt => {
    const isAutoplay = evt.target.value === `on` ? true : false;
    const { setAutoplay } = this.props;
    setAutoplay(isAutoplay);
  };

  render() {
    console.log(`render ----- Option`);
    const { isAutoplay } = this.props;
    return (
      <section className="app__option option">
        <h2 className="visually-hidden">Опции</h2>
        <div className="option__wrapper">
          <button
            className="option__button option__button--sticker"
            data-path={STICKERS}
            onClick={this.onNavButtonClick}
          >
            Sticker
          </button>
          <button
            className="option__button option__button--gif"
            data-path={GIFS}
            onClick={this.onNavButtonClick}
          >
            Gif
          </button>
        </div>
        <div className="option__wrapper">
          <input
            type="radio"
            name="autoplay"
            value="off"
            id="autoplay-off"
            defaultChecked={!isAutoplay}
            onChange={this.onRadioButtonChange}
          />
          <label
            className="option__button option__button--gif"
            htmlFor="autoplay-off"
          >
            Off
          </label>
          <input
            type="radio"
            name="autoplay"
            value="on"
            id="autoplay-on"
            defaultChecked={isAutoplay}
            onChange={this.onRadioButtonChange}
          />
          <label
            className="option__button option__button--sticker"
            htmlFor="autoplay-on"
          >
            On
          </label>
        </div>
      </section>
    );
  }
}

const mapStateToProps = store => {
  return { isAutoplay: store.isAutoplay };
};

export default connect(
  mapStateToProps,
  { setAutoplay }
)(withRouter(Option));
