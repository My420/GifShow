import React, { Component } from "react";
import "./contacts.scss";

class Contacts extends Component {
  render() {
    console.log(`render ----- Contacts`);
    return (
      <div className="app__contacts-wrapper">
        <article className="app__contacts contacts">
          <h1>Contacts.....</h1>
        </article>
      </div>
    );
  }
}

export default Contacts;
