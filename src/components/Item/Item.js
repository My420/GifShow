import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./item.scss";
import { ID } from "../../constant";

class Item extends Component {
  onClick = () => {
    const { src, title, id, itemType } = this.props;
    this.props.onUserClick(`/${itemType}/${ID}/${id}`, src);
  };
  render() {
    console.log(`render ----- Item`);
    const { src, title, id, itemType } = this.props;
    return (
      <article className={`app__item app__item--${id} item`}>
        <h2 className="item__title">{title}</h2>
        <h2 className="item__title">{itemType}</h2>
        <div className="item__image-wrapper" onClick={this.onClick}>
          <img className="item__image" src={src.url} alt="rfhnbyrf" />
        </div>
      </article>
    );
  }
}

export default Item; /*<Link to={`/${itemType}/${ID}/${id}`}>*/
