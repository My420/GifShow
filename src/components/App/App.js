import React, { Component } from "react";
import "./App.scss";
import Header from "../Header/Header";
import Controls from "../Controls/Controls";
import ItemList from "../ItemList/ItemList";

class App extends Component {
  render() {
    console.log(`render ----- App`);
    return (
      <section className="app">
        <h1 className="visually-hidden">Приложение GifShow</h1>
        <Header />
        <main className="app__main">
          <Controls />
          <ItemList />
        </main>
      </section>
    );
  }
}

export default App;
