import React, { Component } from "react";
import "./App.scss";
import Header from "../Header/Header";
import Controls from "../Controls/Controls";
import ContainerType from "../routes/ContainerType";
import Contacts from "../Contacts/Contacts";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

class App extends Component {
  render() {
    console.log(`render ----- App`);
    return (
      <Router>
        <section className="app">
          <Header />
          <div className="app__inner-wrapper">
            <Controls />
            <Switch>
              <Route path="/about" component={Contacts} />
              <Route path="/" component={ContainerType} />
            </Switch>
          </div>
        </section>
      </Router>
    );
  }
}

export default App;
