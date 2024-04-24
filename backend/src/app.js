// Configure environment variables
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";

// Set's our port to the PORT environment variable, or 3000 by default if the env is not configured.
const PORT = process.env.PORT ?? 3000;

// Creates the express server
const app = express();

// Configure middleware (logging, CORS support, JSON parsing support, static files support)
app.use(morgan("combined"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Import and use our application routes.
import routes from "./routes/routes.js";
app.use("/", routes);

// Start the server running, connect to db.
const runAndConnectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    console.log("Successfully connected to MongoDB.");
    app.listen(PORT, () => console.log(`App server listening on port ${PORT}!`));
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  }
};
runAndConnectToDB();


