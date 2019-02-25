import React, { Component } from "react";
import PropTypes from "prop-types";
import "./contacts.scss";
import giphyLogo from "./img/giphy-logo.png";
import AuthorContacts from "../AuthorContacts/AuthorContacts";

class Contacts extends Component {
  render() {
    console.log(`render ----- Contacts`);
    const giphyLogoStyle = {
      width: 100,
      height: 27,
      display: `inline-block`
    };
    return (
      <div className="app__contacts-wrapper">
        <article className="app__about about">
          <h2 className="visually-hidden">About app</h2>
          <section className="about__description">
            <h3 className="visually-hidden">App description</h3>
            <p className="about__app-description">
              GifShow is web application that allows users to search for and
              share short looping videos with no sound, that resemble animated
              GIF files. More description on{" "}
              <a
                className="about__link about__link--github"
                href="https://github.com/My420/GifShow"
                title="GitHub app page"
              >
                GitHub
              </a>
            </p>
            <p className="about__giphy">This application uses the GIPHY API.</p>
            <a
              className="about__link about__link--giphy"
              href="https://developers.giphy.com/docs/"
              title="GIPHY API page"
            >
              <img
                className="about__image about__image--giphy"
                src={giphyLogo}
                alt="GIPHY API"
                style={giphyLogoStyle}
              />
            </a>
          </section>
          <section className="about__author">
            <h3 className="visually-hidden">About developer</h3>
            <p className="about__author-info">
              Developed by Klinovitsky Aleksey.{" "}
              <span className="about__year">{`\u00A9 2019.`}</span>
            </p>
            <AuthorContacts />
          </section>
        </article>
      </div>
    );
  }
}

export default Contacts;

Contacts.propTypes = {
  // from React-Router 4
  match: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object
};
