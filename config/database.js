const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { family: 4 });
    console.log("✅ Database connected");
  } catch (err) {
    console.log("❌ Error connecting to database");
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;