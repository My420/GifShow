import React, { Component } from "react";
import "./App.scss";
import Header from "../Header/Header";
import Controls from "../Controls/Controls";
import ContainerType from "../routes/ContainerType";
import Contacts from "../Contacts/Contacts";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { defineNumberOfColumns } from "../../utils/utils.js";
import { NUMBER_OF_COLUMNS } from "../../constant";

class App extends Component {
  state = {
    numberOfColumns: NUMBER_OF_COLUMNS.FOUR
  };

  onBrowserSizeChange = evt => {
    const currentBrowserWidth = evt.target.innerWidth;
    this.changeNumberOfColumns(currentBrowserWidth);
  };

  changeNumberOfColumns = width => {
    const newNumber = defineNumberOfColumns(width);
    const prewNumber = this.state.numberOfColumns;
    if (newNumber !== prewNumber) {
      this.setState({ numberOfColumns: newNumber });
    }
  };

  componentDidMount() {
    const browserWidth = document.documentElement.clientWidth;
    this.changeNumberOfColumns(browserWidth);
    window.addEventListener("resize", this.onBrowserSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onBrowserSizeChange);
  }

  render() {
    console.log(`render ----- App`, this.state.numberOfColumns);

    const numberOfColumns = this.state.numberOfColumns;

    return (
      <Router>
        <section className="app">
          <Header />
          <div className="app__inner-wrapper">
            <Controls numberOfColumns={numberOfColumns} />
            <Switch>
              <Route path="/about" component={Contacts} />
              <Route
                path="/"
                component={props => (
                  <ContainerType {...props} numberOfColumns={numberOfColumns} />
                )}
              />
            </Switch>
          </div>
        </section>
      </Router>
    );
  }
}

export default App;
