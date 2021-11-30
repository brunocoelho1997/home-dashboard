import React, { Component } from 'react';
import { IEnvironmentDataDto } from '../../Logic/Interfaces';
import './WeatherComponent.css';

export interface IWeatherDataDto {
  idWeatherType: number;
  tMin: String;
  tMax: String;
  precipitaProb: String;
}

class WeatherComponent extends Component {

  weatherDataToday: IWeatherDataDto = {
    idWeatherType: 0,
    precipitaProb: "1 ",
    tMax: "21",
    tMin: "11"
  }

  weatherDataTomorrow: IWeatherDataDto = {
    idWeatherType: 1,
    precipitaProb: "32",
    tMax: "41",
    tMin: "31"
  }
  

  render() {
    return (
      <div className="container-fluid text-white default-component">
      
        <div className="default-component-card">
          
          <div>Hoje</div>
          <div className="mt-2">
            {getWeatherIcon(this.weatherDataToday.idWeatherType)}
          </div>
          <p className="mt-2"> {this.weatherDataToday.tMin}ºC / {this.weatherDataToday.tMax}ºC</p>
          <div className="mt-2"> {getRainProbabilityDiv(+this.weatherDataToday.precipitaProb)} </div>
          
          <hr className="my-4" />

          <div>Amanhã</div>
          <div className="mt-2">
            {getWeatherIcon(this.weatherDataTomorrow.idWeatherType)}
          </div>
          <p className="mt-2"> {this.weatherDataTomorrow.tMin}ºC / {this.weatherDataTomorrow.tMax}ºC</p>
          <div className="mt-2"> {getRainProbabilityDiv(+this.weatherDataTomorrow.precipitaProb)} </div>
          
        </div>

      </div>
    );
  }
  
}

function getRainProbabilityDiv(precipitaProb: number) {
  
  if (precipitaProb > 10) {
    return "Probabilidade de Chover: " + precipitaProb + "%";
  }
  else {
    return ""
  }
}


function getWeatherIcon(idWeatherType: number) {
  switch (idWeatherType) {
    case 0: 
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-cloud-sun" viewBox="0 0 16 16">
          <path d="M7 8a3.5 3.5 0 0 1 3.5 3.555.5.5 0 0 0 .624.492A1.503 1.503 0 0 1 13 13.5a1.5 1.5 0 0 1-1.5 1.5H3a2 2 0 1 1 .1-3.998.5.5 0 0 0 .51-.375A3.502 3.502 0 0 1 7 8zm4.473 3a4.5 4.5 0 0 0-8.72-.99A3 3 0 0 0 3 16h8.5a2.5 2.5 0 0 0 0-5h-.027z"/>
          <path d="M10.5 1.5a.5.5 0 0 0-1 0v1a.5.5 0 0 0 1 0v-1zm3.743 1.964a.5.5 0 1 0-.707-.707l-.708.707a.5.5 0 0 0 .708.708l.707-.708zm-7.779-.707a.5.5 0 0 0-.707.707l.707.708a.5.5 0 1 0 .708-.708l-.708-.707zm1.734 3.374a2 2 0 1 1 3.296 2.198c.199.281.372.582.516.898a3 3 0 1 0-4.84-3.225c.352.011.696.055 1.028.129zm4.484 4.074c.6.215 1.125.59 1.522 1.072a.5.5 0 0 0 .039-.742l-.707-.707a.5.5 0 0 0-.854.377zM14.5 6.5a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/>
        </svg>
      );
    case 1: 
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-cloud-rain" viewBox="0 0 16 16">
          <path d="M4.158 12.025a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm3 0a.5.5 0 0 1 .316.633l-1 3a.5.5 0 0 1-.948-.316l1-3a.5.5 0 0 1 .632-.317zm3 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm3 0a.5.5 0 0 1 .316.633l-1 3a.5.5 0 1 1-.948-.316l1-3a.5.5 0 0 1 .632-.317zm.247-6.998a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 11H13a3 3 0 0 0 .405-5.973zM8.5 2a4 4 0 0 1 3.976 3.555.5.5 0 0 0 .5.445H13a2 2 0 0 1 0 4H3.5a2.5 2.5 0 1 1 .605-4.926.5.5 0 0 0 .596-.329A4.002 4.002 0 0 1 8.5 2z"/>
        </svg>
      );
  }
  return (
    <div className="font-size-3em">--</div>
  );
}

export default WeatherComponent;
