import React, { Component } from 'react';
import './ChartEnviromentDataComponent.css';

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
import faker from 'faker';
import { IEnvironmentDataDto } from '../../Logic/Interfaces';

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
      data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
      borderColor: 'rgb(255, 193, 7)',
      backgroundColor: 'rgba(255, 193, 7, 0.5)',
    }
  ],
};

type ChartEnviromentDataComponentProps = {
  environmentDataDto: IEnvironmentDataDto[]
}
class ChartEnviromentDataComponent extends Component<ChartEnviromentDataComponentProps> {
  

  componentDidUpdate() {
    for (let i = 0; i < data.labels.length; i++) {
      console.log ("temp: " + data.labels[i] + "-" + this.props.environmentDataDto[i*3]?.sensorData);
      
      let humidityIndex = i == 0 ? 1 : i * 3 + 1;
      let smokeLevelIndex = i == 0 ? 2 : i * 3 + 2;
      

      console.log ("humidity: " + data.labels[i] + "-" + this.props.environmentDataDto[humidityIndex]?.sensorData);
      console.log ("smokeLevel: " + data.labels[i] + "-" + this.props.environmentDataDto[smokeLevelIndex]?.sensorData);
      
      data.datasets[0].data[i] = +this.props.environmentDataDto[i*3]?.sensorData;
      data.datasets[1].data[i] = +this.props.environmentDataDto[humidityIndex]?.sensorData;
      data.datasets[2].data[i] = +this.props.environmentDataDto[smokeLevelIndex]?.sensorData;

    }

  }
  
  render() {
    return (
      <div className="container-fluid text-white default-component mb-5">
      
        <div className="default-component-card environment-data-chart-day">
          
          <Line options={options} data={data} />

        </div>

      </div>
    );
  }
}

export default ChartEnviromentDataComponent;
