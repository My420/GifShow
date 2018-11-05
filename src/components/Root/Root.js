import React from "react";

import App from "../App/App";
import store from "../../store/store";
import { Provider } from "react-redux";

function Root() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default Root;
