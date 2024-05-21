// connectdb.js
import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
    return { db: mongoose.connection };
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
    throw error;
  }
};
