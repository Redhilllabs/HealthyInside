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
    <div className="container" style={{ width: "50%" }}>
      <Bar options={options} data={userData} />
      <div className="container">
        <div className="d-flex mt-3">
          <div className="m-2">
            <Button color="blue" size="xl" uppercase>
              MemberShip 100
            </Button>
          </div>
          <div className="m-2">
            <Button color="yellow" size="xl" uppercase>
              Todays Sales 80
            </Button>
          </div>
          <div className="m-2">
            <Button color="red" size="xl" uppercase>
              Todays Profits 69%
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
