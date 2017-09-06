import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const TotalParticipationBarChart = ({ data }) => {
  return (
    <ResponsiveContainer minWidth={300} aspect={1}>
      <BarChart
        layout="vertical"
        width={600}
        height={300}
        data={data}
        margin={{ top: 20, right: 20, left: 20, bottom: 5 }}
      >
        <YAxis dataKey="name" type="category" />
        <XAxis dataKey="participated" type="number" />
        <CartesianGrid />
        <Tooltip />
        <Legend />
        <Bar dataKey="participated" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TotalParticipationBarChart;
