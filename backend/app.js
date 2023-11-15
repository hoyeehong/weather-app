import express from "express";
import cors from "cors";
import WeatherModel from "./db.js";

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/save-data", async (req, res) => {
  const weatherData = new WeatherModel(req.body);
  const isDataExist = await WeatherModel.find();
  if (!isDataExist[0]) {
    await weatherData.save();
  }
  res.status(200).json(`Successfully saved weather information`);
});

app.get("/", async (req, res) => {
  const weatherData = await WeatherModel.find();
  res.send(weatherData[0]);
});

// Server Setup
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
