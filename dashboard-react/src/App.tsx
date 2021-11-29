import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import WeatherAndEnviromentDataComponent from './Components/WeatherAndEnviromentDataComponent/WeatherAndEnviromentDataComponent';

function App() {
  return (
    <div className="App">

      <Navbar />
      
      <WeatherAndEnviromentDataComponent />
      
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <body>

        body!!

      </body>

      <footer>

        goodby!

      </footer>

    </div>
  );
}

export default App;
