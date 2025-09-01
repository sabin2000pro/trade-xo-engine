import dotenv from "dotenv";
dotenv.config({ path: "./env" });
import mongoose from "mongoose";

const DB_URI_PATH = process.env.DB_URI || "";

export const connectDatabaseAsync = async () => {
  try {
    const currConnection = await mongoose.connect(DB_URI_PATH);

    if (currConnection.connection) {
      console.log("Connected to database successfully");
    } else {
      console.log("Could not connect to DB");
    }
  } catch (error) {
    console.log("Error : ", error);
  }
};
