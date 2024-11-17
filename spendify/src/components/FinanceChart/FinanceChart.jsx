import React from "react";
import "./style.less";
import "../../global.less";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Brush,
  AreaChart,
  Area,
} from "recharts";

const data = [
  {
    name: "2018",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "2019",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "2020",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "2021",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "2022",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "2023",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "2024",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const FinanceChart = () => {
  return (
    <div className="finance-chart">
      <LineChart
        width={850}
        height={315}
        data={data}
        syncId="anyId"
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="pv" stroke="#82ca9d" z="true" />
      </LineChart>
    </div>
  );
};

export default FinanceChart;
