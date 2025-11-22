import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const connectDB = async () => {
  try {
    const mongodb_url = process.env.MONGODB_URL
    const conn = await mongoose.connect(mongodb_url as string, { dbName: 'tasks' });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
