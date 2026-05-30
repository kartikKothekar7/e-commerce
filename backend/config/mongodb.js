import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  // Check if already connected (important for serverless to reuse connections)
  if (isConnected) {
    console.log("Using existing MongoDB connection");
    return;
  }

  // Check if connection is ready
  if (mongoose.connection.readyState === 1) {
    isConnected = true;
    console.log("Using existing MongoDB connection");
    return;
  }

  try {
    // For Vercel serverless: enable buffering and set appropriate timeouts
    mongoose.set('bufferCommands', true);

    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "trendify",
      serverSelectionTimeoutMS: 15000,  // Increased for Vercel cold starts
      socketTimeoutMS: 45000,
      connectTimeoutMS: 15000,
      maxPoolSize: 5,  // Lower for serverless
      minPoolSize: 1,
      family: 4,  // Use IPv4, important for Vercel
    });

    isConnected = true;
    console.log("MongoDB connected successfully on Vercel");
  } catch (error) {
    console.error("CRITICAL: MongoDB connection failed:", error.message);
    isConnected = false;
    throw new Error(`Database connection failed: ${error.message}`);
  }
};

export default connectDB;