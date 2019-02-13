import React, { Component } from "react";
import "./authorContacts.scss";
import IconGithub from "../IconGithub/IconGithub";
import IconMail from "../IconMail/IconMail";

class AuthorContacts extends Component {
  render() {
    console.log(`render ----- author-Contacts`);
    return (
      <div className="contacts">
        <ul className="contacts__list">
          <li className="contacts__item contacts__item--github">
            <a
              className="contacts__link contacts__link--github"
              href="https://github.com/My420"
              title="GitHub profile"
            >
              <IconGithub iconWidth={50} iconHeight={50} />
            </a>
          </li>
          <li className="contacts__item contacts__item--mail">
            <a
              className="contacts__link contacts__link--mail"
              href="https://github.com/My420"
              title="Mail Address"
            >
              <IconMail iconWidth={50} iconHeight={50} />
            </a>
          </li>
          <li className="contacts__item contacts__item--skype" />
        </ul>
      </div>
    );
  }
}

export default AuthorContacts;
