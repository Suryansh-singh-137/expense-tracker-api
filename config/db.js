const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to database");
  } catch (e) {
    console.log("❌ MongoDB connection error:", e);
  }
};
module.exports = connectDB;
