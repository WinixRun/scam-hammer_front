import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LineChart from './LineChart';
import PieChart from './PieChart';
import './chartConfig';

const EstadisticasCharts = () => {
  const [lineChartData, setLineChartData] = useState(null);
  const [pieChartData, setPieChartData] = useState(null);
  const [startDate, setStartDate] = useState(
    new Date(new Date().setDate(new Date().getDate() - 7))
      .toISOString()
      .slice(0, 10)
  );
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `/api/stats/by-date?startDate=${startDate}&endDate=${endDate}`
      );
      const data = response.data;

      // Procesar los datos para el gráfico de líneas
      const groupedByDateAndEntity = data.reduce(
        (acc, report) => {
          const date = new Date(report.createdAt).toISOString().slice(0, 10);
          const entity = report.entidadSuplantada || 'Desconocido';

          if (!acc.total[date]) {
            acc.total[date] = 0;
          }
          acc.total[date] += 1;

          if (!acc[entity]) {
            acc[entity] = {};
          }
          if (!acc[entity][date]) {
            acc[entity][date] = 0;
          }
          acc[entity][date] += 1;

          return acc;
        },
        { total: {} }
      );

      const lineChartLabels = Object.keys(groupedByDateAndEntity.total).sort();
      const colors = [
        'rgba(111,251,255,1)',
        'rgba(0,116,255,1)',
        'rgba(54,255,105,1)',
        'rgba(31,142,6,1)',
        'rgba(233,62,62,1)',
        'rgba(255,136,1,1)',
        'rgba(221,255,1,1)',
        'rgba(110,1,255,1)',
        'rgba(237,1,255,1)',
        'rgba(213,60,109,1)',
        'rgba(255,215,0,1)',
      ];
      let colorIndex = 0;

      const lineChartDatasets = Object.keys(groupedByDateAndEntity).map(
        (entity) => {
          const color =
            entity === 'total'
              ? 'rgba(255, 255, 255, 1)'
              : colors[colorIndex++ % colors.length];
          return {
            label: entity,
            data: lineChartLabels.map(
              (date) => groupedByDateAndEntity[entity][date] || 0
            ),
            borderColor: color,
            backgroundColor: color,
            fill: false,
          };
        }
      );

      const lineData = {
        labels: lineChartLabels,
        datasets: lineChartDatasets,
      };

      // Procesar los datos para el gráfico de pastel
      const groupedByEntity = data.reduce((acc, report) => {
        const entity = report.entidadSuplantada || 'Desconocido';
        if (!acc[entity]) {
          acc[entity] = 0;
        }
        acc[entity] += 1;
        return acc;
      }, {});

      const pieChartLabels = Object.keys(groupedByEntity);
      const pieChartDataPoints = pieChartLabels.map(
        (entity) => groupedByEntity[entity]
      );

      const pieData = {
        labels: pieChartLabels,
        datasets: [
          {
            data: pieChartDataPoints,
            backgroundColor: colors,
            borderColor: colors,
            borderWidth: 1,
          },
        ],
      };

      setLineChartData(lineData);
      setPieChartData(pieData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  return (
    <main className='flex flex-col items-start justify-center min-h-screen max-w-7xl mx-auto px-4 py-4 space-y-8'>
      <h1 className='text-4xl font-bold mb-2 text-white'>
        Estadísticas sobre intentos de{' '}
        <span className='text-[#2cb3d9]'>Phishing</span>
      </h1>
      <div className='w-full flex justify-end mb-4'>
        <div>
          <label htmlFor='startDate' className='mr-2 text-[#2cb3d9]'>
            Desde:
          </label>
          <input
            type='date'
            id='startDate'
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className='text-[#2cb3d9] bg-gray-700'
            style={{
              backgroundColor: '#2c2c2c',
              color: '#2cb3d9',
              border: '1px solid #2cb3d9',
              padding: '5px',
              borderRadius: '4px',
            }}
          />
          <label htmlFor='endDate' className='ml-4 mr-2 text-[#2cb3d9]'>
            Hasta:
          </label>
          <input
            type='date'
            id='endDate'
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className='text-[#2cb3d9] bg-gray-700'
            style={{
              backgroundColor: '#2c2c2c',
              color: '#2cb3d9',
              border: '1px solid #2cb3d9',
              padding: '5px',
              borderRadius: '4px',
            }}
          />
        </div>
      </div>
      <div className='w-full mb-8'>
        <h2 className='text-2xl font-bold mb-4 text-[#2cb3d9]'>
          Total de Reportes:{' '}
          {lineChartData &&
            lineChartData.datasets[0].data.reduce((a, b) => a + b, 0)}
        </h2>
      </div>
      {lineChartData && (
        <div className='w-full h-[400px] mb-8'>
          <h2 className='text-2xl font-bold mb-4 text-[#2cb3d9]'>
            Reportes por Día
          </h2>
          <div className='card bg-gray-800 p-6 rounded-lg shadow-lg h-full'>
            <LineChart
              data={lineChartData}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </div>
      )}
      <br />
      <br />
      <br />
      <br />
      {pieChartData && (
        <div className='w-full h-[400px] mb-8'>
          <h2 className='text-2xl font-bold mb-4 text-[#2cb3d9]'>
            Reportes por Entidad Suplantada
          </h2>
          <div className='card bg-gray-800 p-6 rounded-lg shadow-lg h-full'>
            <PieChart
              data={pieChartData}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </div>
      )}
      <br />
      <br />
      <br />
    </main>
  );
};

export default EstadisticasCharts;
