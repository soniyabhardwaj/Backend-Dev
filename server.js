require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

const rateLimiter = require("./middleware/rateLimiter");

const app = express();
app.use(express.json());
app.use(rateLimiter);

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/tx", transactionRoutes);

app.listen(process.env.PORT, () =>
  console.log("Server running")
);