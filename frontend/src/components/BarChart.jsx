import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ month }) => {
  const [barChartData, setBarChartData] = useState([]);

  useEffect(() => {
    fetchBarChartData();
  }, [month]);

  const fetchBarChartData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/bar-chart?month=${month}`);
      setBarChartData(response.data);
    } catch (error) {
      console.error('Error fetching bar chart data:', error);
    }
  };

  const data = {
    labels: barChartData.map((item) => item.range),
    datasets: [
      {
        label: 'Number of Items',
        data: barChartData.map((item) => item.count),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div className="bar-chart">
      <h2>Bar Chart</h2>
      <Bar data={data} />
    </div>
  );
};

export default BarChart;