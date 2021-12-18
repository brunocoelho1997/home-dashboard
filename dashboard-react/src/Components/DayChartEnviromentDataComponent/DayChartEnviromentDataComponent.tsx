import React, { useEffect } from 'react';
import './DayChartEnviromentDataComponent.css';

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
import { BASE_URL, GET_ENVIRONMENT_DATA_FROM_DAY_ENDPOINT } from '../../Logic/Constants';

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

const labels = ['04:00', '08:00', '12:00', '16:00', '20:00', '24:00'];

const axiosClient = axios.create({
  baseURL: BASE_URL 
});

function DayChartEnviromentDataComponent() {
  
  const [data, setData] = React.useState<any>(null);
  
  
  useEffect(() => {
    
    async function getEnvironmentDataFromDay() {
      const response = await axiosClient.get<IEnvironmentDataDto[]>(GET_ENVIRONMENT_DATA_FROM_DAY_ENDPOINT).then(response => {
        console.log(response.data);

        const data = {
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

export default DayChartEnviromentDataComponent;
