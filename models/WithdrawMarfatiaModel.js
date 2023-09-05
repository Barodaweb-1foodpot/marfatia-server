const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  ClientCode: {
    type: String,
    required: true
  },
  Segment: {
    type: String
  },
  Name: {
    type: String,
    required: true

  },
  Email: {
    type: String,
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  },
  ContactNo: {
    type: String
  },
  PAN: {
    type: String
  },
  Amount: {
    type: Number
  },
  AddedOn: {
    type: Date,
    default: Date.now
  },
  UpdatedOn: {
    type: Date,
    default: null
  },
  IsActive: {
    type: Boolean,
    default: true
  }
});

const WithdrawMarfatiaModel = mongoose.model('withdraw_marfatia', clientSchema);

module.exports = WithdrawMarfatiaModel;
