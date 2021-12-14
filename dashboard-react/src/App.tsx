import './App.css';
import Navbar from './Components/Navbar/Navbar';
import WeatherAndEnviromentDataComponent from './Components/WeatherAndEnviromentDataComponent/WeatherAndEnviromentDataComponent';

function App() {
  return (
    <div className="App">

      <header>
        <Navbar />
      </header>
      
      <body>
        <WeatherAndEnviromentDataComponent />
      </body>

    </div>
  );
}

export default App;
