import React from 'react';
import { Pie } from 'react-chartjs-2';
import Chart from './chartjsConfig';

const PieChart = ({ data }) => {
  const totalReports = data.datasets[0].data.reduce((a, b) => a + b, 0);

  return (
    <div className='relative w-full h-full'>
      <div className='flex justify-between items-center'></div>
      <Pie
        data={data}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'right',
              align: 'start',
              labels: {
                boxWidth: 20,
                padding: 20,
              },
            },
          },
        }}
      />
    </div>
  );
};

export default PieChart;
