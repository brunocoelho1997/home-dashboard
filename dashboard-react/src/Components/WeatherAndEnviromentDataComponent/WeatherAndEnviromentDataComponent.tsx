import React, { useState, useEffect } from 'react';
import axios from "axios";
import EnviromentDataComponent from '../EnviromentDataComponent/EnviromentDataComponent';
import './WeatherAndEnviromentDataComponent.css';
import { IEnvironmentDataDto } from '../../Logic/Interfaces';
import DatetimeComponent from '../DatetimeComponent/DatetimeComponent';
import WeatherComponent from '../WeatherComponent/WeatherComponent';
import { BASE_URL, GET_CURRENT_ENVIRONMENT_DATA_ENDPOINT, GET_ENVIRONMENT_DATA_FROM_DAY_ENDPOINT } from '../../Logic/Constants';
import ChartEnviromentDataComponent from '../ChartEnviromentDataComponent/ChartEnviromentDataComponent';


const axiosClient = axios.create({
  baseURL: BASE_URL 
});


function WeatherAndEnviromentDataComponent() {

  const [environmentData, setEnvironmentData] = React.useState<IEnvironmentDataDto[]>([]);
  
  useEffect(() => {
 
    async function getCurrentEnvironmentData() {
      const response = await axiosClient.get<IEnvironmentDataDto[]>(GET_CURRENT_ENVIRONMENT_DATA_ENDPOINT).then(response => {
        console.log(response.data);
        setEnvironmentData( response.data );
      });
    }
    getCurrentEnvironmentData();
    
  }, []);


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
              {environmentData.map((environmentDataEntry, i) => {     
                return (
                  <div className="col-md-4 p-1">
                    <EnviromentDataComponent environmentDataDto={environmentDataEntry} />
                  </div>
                ) 
              })}
            </div>
            <div className="row mt-2">
              <div className="col-md-12">
                <ChartEnviromentDataComponent />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherAndEnviromentDataComponent;
