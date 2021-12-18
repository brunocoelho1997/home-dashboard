import React, { Component, useEffect } from 'react';
import './WeekChartEnviromentDataComponent.css';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { IEnvironmentDataDto } from '../../Logic/Interfaces';
import axios from 'axios';
import { BASE_URL, GET_ENVIRONMENT_DATA_FROM_WEEK_ENDPOINT } from '../../Logic/Constants';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Temperatura, Humidade e Nível de Fumo ao longo do dia',
    },
  },
};

const labels = ['day_6', 'day_5', 'day_4', 'day_3', 'day_2', 'day_1', 'day_0'];

const axiosClient = axios.create({
  baseURL: BASE_URL 
});

function WeekChartEnviromentDataComponent() {
  
  const [data, setData] = React.useState<any>(null);
  
  useEffect(() => {
    
    async function getEnvironmentDataFromDay() {
      const response = await axiosClient.get<IEnvironmentDataDto[]>(GET_ENVIRONMENT_DATA_FROM_WEEK_ENDPOINT).then(response => {
        console.log(response.data);

        let data = {
          labels,
          datasets: [
            {
              label: 'Temperatura',
              data: labels.map(() => 0),
              borderColor: 'rgb(220, 53, 69)',
              backgroundColor: 'rgba(220, 53, 69, 0.5)',
            },
            {
              label: 'Humidade',
              data: labels.map(() => 0),
              borderColor: 'rgb(0, 123, 255)',
              backgroundColor: 'rgba(0, 123, 255, 0.5)',
            },
            {
              label: 'Fumo',
              data: labels.map(() => 0),
              borderColor: 'rgb(255, 193, 7)',
              backgroundColor: 'rgba(255, 193, 7, 0.5)',
            }
          ],
        };


        for (let i = 0; i < data.labels.length; i++) {
          //console.log ("temp: " + data.labels[i] + "-" + chartEnviromentDataComponentProps.environmentDataDto[i*3]?.sensorData);
          
          let humidityIndex = i == 0 ? 1 : i * 3 + 1;
          let smokeLevelIndex = i == 0 ? 2 : i * 3 + 2;
        
          //console.log ("humidity: " + data.labels[i] + "-" + chartEnviromentDataComponentProps.environmentDataDto[humidityIndex]?.sensorData);
          //console.log ("smokeLevel: " + data.labels[i] + "-" + chartEnviromentDataComponentProps.environmentDataDto[smokeLevelIndex]?.sensorData);
          
          data.datasets[0].data[i] = +response.data[i*3]?.sensorData;
          data.datasets[1].data[i] = +response.data[humidityIndex]?.sensorData;
          data.datasets[2].data[i] = +response.data[smokeLevelIndex]?.sensorData;

        }

        for (let i = 0; i < data.labels.length; i++) {

          const date = new Date(response.data[i*3]?.timestamp);
          const dayOfWeek = date.getDay();

          //console.log("day of the week - " + response.data[i*3]?.timestamp + " - " + getDayOfTheWeek(dayOfWeek));

          labels[i] = getDayOfTheWeek(dayOfWeek);
        }



        setData(data); 

      });
    }
    getEnvironmentDataFromDay();
  }, []);
  
  return (
    <div className="container-fluid text-white default-component mb-5">
    
      <div className="default-component-card environment-data-chart-day">
        
        {data ? <Line options={options} data={data} /> : "Not loaded yet"} 

      </div>

    </div>
  );
}

function getDayOfTheWeek(day: number) {
  switch (day) {
    case 0: return "Domingo";
    case 1: return "Segunda-feira";
    case 2: return "Terça-feira";
    case 3: return "Quarta-feira";
    case 4: return "Quinta-feira";
    case 5: return "Sexta-feira";
    case 6: return "Sábado";
  }
  return "Dia não reconhecido";
}

export default WeekChartEnviromentDataComponent;
