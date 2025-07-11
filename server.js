const express = require("express");
const app = express();
require("dotenv").config();
app.use(express.json());
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;
const authRoutes = require("./routes/auth");
connectDB();
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
