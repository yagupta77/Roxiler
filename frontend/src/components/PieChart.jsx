import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const PieChartComponent = ({ month }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchPieChartData();
  }, [month]);

  const fetchPieChartData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/pie-chart`, {
        params: { month },
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching pie chart data:", error);
    }
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <PieChart width={250} height={250}> {/* Smaller Size */}
        <Pie
          data={data}
          dataKey="count"
          nameKey="_id"
          cx="50%"
          cy="50%"
          outerRadius={80} // Reduce Outer Radius
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default PieChartComponent;
