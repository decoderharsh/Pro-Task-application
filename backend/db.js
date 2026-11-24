
import mongoose from 'mongoose';

const connectToMongo = async () => {
  try {
    await mongoose.connect(process.env.mongoURI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
};

export default connectToMongo;
