const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware (helps debug incoming requests)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Test route
app.get("/", (req, res) => {
  console.log("Root route was hit!"); // Debug log
  res.send("E-commerce API is running...");
});

// Handle 404 (if no routes match)
app.use((req, res) => {
  console.log(`Route not found: ${req.method} ${req.url}`); // Debug log
  res.status(404).send("Route not found");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Try accessing: http://localhost:${PORT}/`); // Helpful reminder
});