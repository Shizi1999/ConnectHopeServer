const mongoose = require("mongoose");

const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("Connected mongoDB");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = ConnectDB;
