import React, { Component } from "react";
import "./iconMail.scss";

class IconMail extends Component {
  render() {
    const { iconWidth, iconHeight, iconColor } = this.props;
    const iconStyle = {
      width: iconWidth,
      height: iconHeight
    };

    return (
      <div className="contacts__icon contacts__icon--mail" style={iconStyle}>
        <svg
          className="mail"
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 493.497 493.497"
          enableBackground="new 0 0 493.497 493.497"
          space="preserve"
        >
          <path
            className="mail__path"
            fill={iconColor}
            d="M444.556,85.218H48.942C21.954,85.218,0,107.171,0,134.16v225.177c0,26.988,21.954,48.942,48.942,48.942h395.613
	c26.988,0,48.941-21.954,48.941-48.942V134.16C493.497,107.171,471.544,85.218,444.556,85.218z M460.87,134.16v225.177
	c0,2.574-0.725,4.924-1.793,7.09L343.74,251.081l117.097-117.097C460.837,134.049,460.87,134.096,460.87,134.16z M32.628,359.336
	V134.16c0-0.064,0.033-0.11,0.033-0.175l117.097,117.097L34.413,366.426C33.353,364.26,32.628,361.911,32.628,359.336z
	 M251.784,296.902c-2.692,2.691-7.378,2.691-10.07,0L62.667,117.846h368.172L251.784,296.902z M172.827,274.152l45.818,45.819
	c7.512,7.511,17.493,11.645,28.104,11.645c10.61,0,20.592-4.134,28.104-11.645l45.82-45.819l101.49,101.499H71.327L172.827,274.152z
	"
          />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
        </svg>
      </div>
    );
  }
}

export default IconMail;
