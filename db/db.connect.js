const mongoose = require("mongoose");
require("dotenv").config();

const mongo_URI = process.env.MONGODB_URI;

const initializeDb = async () => {
  try {
    const connection = await mongoose.connect(mongo_URI);
    if (connection) {
      console.log("database connected");
    }
  } catch (error) {
    console.log(error, "error connecting to database");
  }
};

module.exports = { initializeDb };
