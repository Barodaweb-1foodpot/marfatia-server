const mongoose = require('mongoose');

const transfersSchema = new mongoose.Schema({
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  ContactNo: {
    type: Number,
    required: true,
  },
  Amount: {
    type: Number,
    required: true,
  },
  BankAcountNo: {
    type: String,
    required: true,
  },
  BankName: {
    type: String,
    required: true,
  },
  BranchName: {
    type: String,
    required: true,
  },
  ImageLoc: {
    type: String,
  },
  Address: {
    type: String,
  },
  Comment: {
    type: String,
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

const transfersModel = mongoose.model('transfers', transfersSchema);

module.exports = transfersModel;
