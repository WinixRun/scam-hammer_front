import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = ({ data, totalReports }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      annotation: {
        annotations: {
          totalReports: {
            type: 'label',
            content: `Total: ${totalReports}`,
            position: 'center',
            fontSize: 16,
            fontColor: '#000',
            fontStyle: 'bold',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
          },
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
