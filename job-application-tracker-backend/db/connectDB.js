import mongoose from "mongoose";

const connectDB = async (DATABASE_URL) => {
  try {
    await mongoose.connect(DATABASE_URL);
    console.log('Connected to Database...');
  } catch (error) {
    console.error(`Error connecting to the database:`,error);
  }
};

export default connectDB;