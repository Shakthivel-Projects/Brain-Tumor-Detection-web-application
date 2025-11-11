const express = require("express");
const cors = require("cors");
require("dotenv").config();  // <-- IMPORTANT
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const predictRoutes = require("./routes/predict");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/auth", authRoutes);
app.use("/predict", predictRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
