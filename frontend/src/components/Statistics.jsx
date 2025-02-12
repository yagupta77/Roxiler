import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Statistics = ({ month }) => {
  const [statistics, setStatistics] = useState({});

  useEffect(() => {
    fetchStatistics();
  }, [month]);

  const fetchStatistics = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/statistics?month=${month}`);
      setStatistics(response.data);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  return (
    <div className="statistics">
      <h2>Statistics</h2>
      <p>Total Sale Amount: ${statistics.totalSaleAmount || 0}</p>
      <p>Total Sold Items: {statistics.totalSoldItems || 0}</p>
      <p>Total Not Sold Items: {statistics.totalNotSoldItems || 0}</p>
    </div>
  );
};

export default Statistics;