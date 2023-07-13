const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const organizationSchema = new mongoose.Schema(
  {
    id: ObjectId,
    name: {
      type: String,
      required: true,
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
    email: {
      type: String,
    },
    description: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
    censored: {
      type: Boolean,
    },
    website: {
      type: String,
    },
    images: {
      type: [String],
    },
    author: {
      type: ObjectId,
      require: true,
    },
  },
  { timestamps: true }
);

const Organization = mongoose.model("Organization", organizationSchema);

module.exports = Organization;
