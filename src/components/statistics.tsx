import React, { useState } from "react";

import { Bar } from "react-chartjs-2";

import { UserData } from "./data";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Button } from "@mantine/core";
const Statistics = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Weekly Stats",
      },
    },
  };

  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Product Sales",
        data: UserData.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  return (
    <div className="container" style={{ width: "100%" }}>
  <div className="col">
    <div className="col-md-6">
      <Bar options={options} data={userData} />
    </div>
    <div className="col-md-6">
      <div className="d-flex flex-column mt-3">
        <div className="m-2">
          <button className="btn bg-primary text-white">Membership 100</button>
        </div>
        <div className="m-2">
          <button className="btn bg-success text-white">Todays Sales 80</button>
        </div>
        <div className="m-2">
          <button className="btn bg-danger text-white">Todays Profits 69%</button>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default Statistics;
