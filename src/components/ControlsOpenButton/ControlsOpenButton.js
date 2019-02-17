import React, { Component } from "react";
import "./controlsOpenButton.scss";

class ContolsOpenButton extends Component {
  render() {
    console.log(`render ----- COntolsOpenButton`);
    return (
      <React.Fragment>
        <input
          type="checkbox"
          name="opener"
          value="open"
          defaultChecked
          id="opener"
          className="opener__checkbox visually-hidden"
        />
        <label className="opener__label" htmlFor="opener" tabIndex="0">
          <span className="visually-hidden">Open or HIde Controls Button</span>
        </label>
      </React.Fragment>
    );
  }
}

export default ContolsOpenButton;
