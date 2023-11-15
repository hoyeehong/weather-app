import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database Connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
connectDB();
const WeatherSchema = new mongoose.Schema({}, { strict: false });
const WeatherModel = mongoose.model("Weather", WeatherSchema);
export default WeatherModel;
