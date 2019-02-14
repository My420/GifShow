import React, { Component } from "react";
import "./authorContacts.scss";
import IconGithub from "../IconGithub/IconGithub";
import IconMail from "../IconMail/IconMail";
import IconSkype from "../IconSkype/IconSkype";

class AuthorContacts extends Component {
  constructor(props) {
    super(props);
    this.extraWidth = 30;
    this.contactsIconAmount = 3;
    this.contactsIconWidth = 40;
    this.contactsIconHeight = 40;
    this.contactsListWidth =
      this.contactsIconWidth * this.contactsIconAmount + this.extraWidth;
    this.iconColor = `#bac5d0`;
  }
  render() {
    const listStyle = { width: this.contactsListWidth };
    console.log(`render ----- author-Contacts`);
    return (
      <div className="contacts">
        <ul className="contacts__list" style={listStyle}>
          <li className="contacts__item contacts__item--github">
            <a
              className="contacts__link contacts__link--github"
              href="https://github.com/My420"
              title="GitHub profile"
            >
              <IconGithub
                iconWidth={this.contactsIconWidth}
                iconHeight={this.contactsIconHeight}
                iconColor={this.iconColor}
              />
            </a>
          </li>
          <li className="contacts__item contacts__item--mail">
            <a
              className="contacts__link contacts__link--mail"
              href="mailto:klinovitsky.aleksey@gmail.com"
              title="Mail Address"
            >
              <IconMail
                iconWidth={this.contactsIconWidth}
                iconHeight={this.contactsIconHeight}
                iconColor={this.iconColor}
              />
            </a>
          </li>
          <li className="contacts__item contacts__item--skype">
            <a
              className="contacts__link contacts__link--skype"
              href="skype:live:klinovitsky.aleksey?chat"
              title="Skype"
            >
              <IconSkype
                iconWidth={this.contactsIconWidth}
                iconHeight={this.contactsIconHeight}
                iconColor={this.iconColor}
              />
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default AuthorContacts;
