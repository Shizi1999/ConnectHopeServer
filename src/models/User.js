const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const userSchema = new mongoose.Schema({
  id: ObjectId,
  fullname: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  phone: {
    type: String,
  },
  birthday: {
    type: Date,
  },
  address: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
