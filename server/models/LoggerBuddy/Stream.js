const mongoose = require("mongoose");
const Post = require("./Post");

const Schema = mongoose.Schema;

const Stream = new Schema({
  streamName: { type: String, required: true },
  dateCreated: { type: Date, required: true },
  streamDescription: { type: String, required: true },
  links: [String],
  posts: [],
  color: { type: String, required: true },
});

module.exports = mongoose.model("Stream", Stream);
