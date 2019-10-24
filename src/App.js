import React, { Component } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

// CS
import "./App.css";
import "./css/main.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const script = document.createElement("script");

    script.src = "js/script.js";
    script.async = true;

    document.body.appendChild(script);
  }

  render() {
    return (
      <div id="wrapper">
        <section id="main">
          <Header />
          <Footer />
          <script />
        </section>
      </div>
    );
  }
}

export default App;
