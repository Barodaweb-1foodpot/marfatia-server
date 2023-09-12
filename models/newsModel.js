const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  newsFeed: {
    type: String,
    required: true,
  },
  newsTitle: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  news: {
    type: String,
    required: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
  deletedAt: {
    type: Date,
  },
});

const newsModela = mongoose.model("news_master", newsSchema);

module.exports = newsModela;
