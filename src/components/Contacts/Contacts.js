import React, { Component } from "react";
import "./contacts.scss";
import giphyLogo from "./img/giphy-logo.png";
import AuthorContacts from "../AuthorContacts/AuthorContacts";

class Contacts extends Component {
  render() {
    console.log(`render ----- Contacts`);
    return (
      <div className="app__contacts-wrapper">
        <article className="app__about about">
          <h2 className="visually-hidden">About app</h2>
          <section className="about__description">
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
              />
            </a>
          </section>
          <section className="about__author">
            <p className="about__author-info">
              Developed by Joe Doe.{" "}
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
