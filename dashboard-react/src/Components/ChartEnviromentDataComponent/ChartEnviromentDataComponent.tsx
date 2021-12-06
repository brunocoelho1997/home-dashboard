import React, { useState, useEffect } from 'react';
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

const labels = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Temperatura',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 40 })),
      borderColor: 'rgb(220, 53, 69)',
      backgroundColor: 'rgba(220, 53, 69, 0.5)',
    },
    {
      label: 'Humidade',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
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


function ChartEnviromentDataComponent() {

  return (
    <div className="container-fluid text-white default-component mb-5">
    
      <div className="default-component-card environment-data-chart-day">
        
        <Line options={options} data={data} />

      </div>

    </div>
  );
}

export default ChartEnviromentDataComponent;
