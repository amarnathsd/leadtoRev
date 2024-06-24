import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns'; // Import the date-fns adapter for Chart.js

const MultiLineChart = ({ dates, cases, deaths, recovered }) => {
  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Cases',
        data: cases,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false,
      },
      {
        label: 'Deaths',
        data: deaths,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: false,
      },
      {
        label: 'Recovered',
        data: recovered,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'time', // Use 'time' for the x-axis
        time: {
          unit: 'day', // Display unit by day
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default MultiLineChart;
