const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const postSchema = new mongoose.Schema(
  {
    id: ObjectId,
    title: {
      type: String,
      required: true,
    },
    thumbnail: {
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
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
