import React, { Component } from 'react'
import logo from './logo.svg';
import Header from './components/Header';
import Footer from './components/Footer';

// JS Plugins
import counterUp from 'counterup2'

// CSS
import './App.css';
import './css/main.scss';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const script = document.createElement('script');

    script.src = 'js/script.js';
    script.async = true;

    document.body.appendChild(script);

  }

  render() {
    return (
      <div id="wrapper">
        <section id="main">
          <Header data={logo} />
          <Footer />
          <script>

          </script>
        </section>
      </div>
    )
  }
}


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
