import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "../config/mongodb.js";
import connectCloudinary from "../config/cloudinary.js";

import userRouter from "../routes/userRoute.js";
import productRouter from "../routes/productRoute.js";
import orderRouter from "../routes/orderRoute.js";

// INFO: Create express app
const app = express();

// INFO: Middleware
app.use(express.json());
app.use(cors());

// INFO: Initialize services with proper async handling
let dbConnected = false;

app.use(async (req, res, next) => {
  if (!dbConnected) {
    try {
      await connectDB();
      connectCloudinary();
      console.log("Services connected");
      dbConnected = true;
    } catch (error) {
      console.error("Failed to connect services:", error);
      return res.status(500).json({ success: false, message: "Database connection failed" });
    }
  }
  next();
});

// INFO: API endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);

// INFO: Default route
app.get("/", (req, res) => {
  res.send("API is running on Vercel 🚀");
});

// ❌ DO NOT USE app.listen()
// ✅ EXPORT app instead
export default app;
