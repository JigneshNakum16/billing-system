import { app } from "./app.js";
import connectionDB from "./db/index.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

connectionDB()
  .then(() => {
    app.on("error", (error) => {
      console.error(`Error: ${error}`);
      throw error;
    });
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error(`MongoDB connection failed error: ${error}`);
    throw error;
  });
