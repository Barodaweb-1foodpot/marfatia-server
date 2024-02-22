const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
  mailerName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
  },
  emailAddress: {
    type: String,
    required: true,
  },
  emailPassword: {
    type: String,
    required: true,

  },
  adminEmailAddress: {
    type: String,
    required: true,

  },
  outgoingServer: {
    type: String,
    required: true,

  },
  sslType: {
    type: String,
    required: true,

  },
  outgoingPort: {
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
  status: {
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

const emailModel = mongoose.model("email_setting", emailSchema);

module.exports = emailModel;
