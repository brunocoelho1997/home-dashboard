import React from 'react';
import EnviromentDataComponent from '../EnviromentDataComponent/EnviromentDataComponent';
import './WeatherAndEnviromentDataComponent.css';
import { IEnvironmentDataDto } from '../../Logic/Interfaces';
import DatetimeComponent from '../DatetimeComponent/DatetimeComponent';
import WeatherComponent from '../WeatherComponent/WeatherComponent';


class WeatherAndEnviromentDataComponent extends React.Component {

  dummyEnvironmentData:IEnvironmentDataDto = {
    timestamp: "Last update: 2021-12-01 - 12:03:12h",
    name: "Sala de estar",
    sensorData: "12ºC"
  }

  render() {
    return (
      <div className="container-fluid pt-4">
      
        <div className="row">
          <div className="col-sm-4">
            <div className="container-fluid">

              <div className="row">
                <div className="col-12 p-1">
                  <DatetimeComponent />
                </div>
              </div>

              <div className="row">
                <div className="col-12 p-1">
                  <WeatherComponent />
                </div>
              </div>              
              
            </div>
          </div>
          <div className="col-sm-8">
            <div className="container-fluid">

              <div className="row">
                <div className="col-4 p-1">
                  <EnviromentDataComponent environmentDataDto={this.dummyEnvironmentData} />
                </div>
                <div className="col-4 p-1">
                  <EnviromentDataComponent environmentDataDto={this.dummyEnvironmentData}/>
                </div>
                <div className="col-4 p-1">
                  <EnviromentDataComponent environmentDataDto={this.dummyEnvironmentData} />
                </div>
              </div>

              <div className="row">
                <div className="col-4 p-1">
                  <EnviromentDataComponent environmentDataDto={this.dummyEnvironmentData} />
                </div>
                <div className="col-4 p-1">
                  <EnviromentDataComponent environmentDataDto={this.dummyEnvironmentData} />
                </div>
                <div className="col-4 p-1">
                  <EnviromentDataComponent environmentDataDto={this.dummyEnvironmentData} />
                </div>
              </div>
              

              <div className="row">
              <div className="col-4 p-1">
                  <EnviromentDataComponent environmentDataDto={this.dummyEnvironmentData} />
                </div>
                <div className="col-4 p-1">
                  <EnviromentDataComponent environmentDataDto={this.dummyEnvironmentData} />
                </div>
                <div className="col-4 p-1">
                  <EnviromentDataComponent environmentDataDto={this.dummyEnvironmentData} />
                </div>
              </div>
                
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default WeatherAndEnviromentDataComponent;
