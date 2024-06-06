import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in the environment variables");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("User Service Database connected");
  } catch (error: any) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

export { connectDB };
