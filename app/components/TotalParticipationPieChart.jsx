import React from 'react';
import { PieChart, Pie, Legend, Tooltip } from 'recharts';

const TotalParticipationPieChart = props => {
  console.log(props.data);
  return (
    <PieChart width={800} height={800}>
      <Pie
        nameKey="name"
        data={props.data}
        label
        cx={500}
        cy={300}
        innerRadius={80}
        outerRadius={180}
        fill="#82ca9d"
      />
      <Tooltip />
    </PieChart>
  );
};

export default TotalParticipationPieChart;
