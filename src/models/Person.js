const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const personSchema = new mongoose.Schema(
  {
    id: ObjectId,
    fullname: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    birthday: {
      type: Date,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
    zalo: {
      type: String,
    },
    shortDescription: {
      type: String,
    },
    description: {
      type: String,
    },
    censored: {
      type: Boolean,
      default: false,
    },
    author: {
      type: ObjectId,
      require: true,
    },
    images: {
      type: [String],
    },
  },
  { timestamps: true }
);

const Person = mongoose.model("Person", personSchema);

module.exports = Person;
