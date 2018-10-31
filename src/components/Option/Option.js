import React, { Component } from "react";
import "./option.scss";

class Option extends Component {
  render() {
    console.log(`render ----- Option`);
    return (
      <section className="app__option option">
        <h2 className="visually-hidden">Опции</h2>
        <div className="option__wrapper">
          <input
            type="radio"
            name="content-type"
            value="gif"
            id="gif"
            defaultChecked
          />
          <label className="option__button option__button--gif" htmlFor="gif">
            Gif
          </label>
          <input
            type="radio"
            name="content-type"
            value="sticker"
            id="sticker"
          />
          <label
            className="option__button option__button--sticker"
            htmlFor="sticker"
          >
            Sticker
          </label>
        </div>
        <div className="option__wrapper">
          <input
            type="radio"
            name="autoplay"
            value="off"
            id="autoplay-off"
            defaultChecked
          />
          <label
            className="option__button option__button--gif"
            htmlFor="autoplay-off"
          >
            Off
          </label>
          <input type="radio" name="autoplay" value="on" id="autoplay-on" />
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

export default Option;
