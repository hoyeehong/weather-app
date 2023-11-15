import React from "react";
import { LineChart, ColomnBarChart } from "./Chart";

const Dashboard = ({ weatherData }) => {
  const temperatureData = {
    labels: weatherData.daily.time,
    datasets: [
      {
        label: "Min Temperature °C",
        data: weatherData.daily.temperature_2m_min,
        borderColor: "blue",
      },
      {
        label: "Max Temperature °C",
        data: weatherData.daily.temperature_2m_max,
        borderColor: "red",
      },
    ],
  };

  const humidityData = {
    labels: weatherData.hourly.time,
    datasets: [
      {
        label: "Relative Humidity(2m) %",
        data: weatherData.hourly.relativehumidity_2m,
        backgroundColor: "lightblue",
      },
    ],
  };

  const directRadiationData = {
    labels: weatherData.hourly.time,
    datasets: [
      {
        label: "Direct Radiation W/m²",
        data: weatherData.hourly.direct_radiation,
        borderColor: "red",
        backgroundColor: "orange",
        fill: true,
      },
    ],
  };

  return (
    <div>
      <h1>Weather Dashboard</h1>
      <LineChart data={temperatureData} />
      <ColomnBarChart data={humidityData} />
      <LineChart data={directRadiationData} />
    </div>
  );
};

export default Dashboard;
