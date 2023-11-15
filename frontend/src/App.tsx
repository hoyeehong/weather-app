import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import axios from "axios";

function App() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=1.29&longitude=103.85&hourly=relativehumidity_2m,direct_radiation&daily=temperature_2m_max,temperature_2m_min&timezone=Asia%2FSingapore&start_date=2023-10-01&end_date=2023-10-10"
    )
      .then((response) => response.json())
      .then(async (data) => {
        setWeatherData(data);
        // Store data in local database
        try {
          await axios({
            method: "post",
            url: process.env.REACT_APP_SAVE_DATA,
            data: data,
          }).then((response) => {
            if (response.statusText === "OK") {
              console.log(response.data);
            }
          });
        } catch (err) {
          console.log(err);
        }
      })
      .catch(async (error) => {
        console.error(error);
        // Fetch data from local database
        await axios
          .get(process.env.REACT_APP_BACKEND_SERVICES)
          .then((response) => {
            setWeatherData(response.data);
          });
      });
  }, []);

  return (
    <div className="App">
      {weatherData ? (
        <Dashboard weatherData={weatherData} />
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

export default App;
