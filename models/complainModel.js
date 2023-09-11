const mongoose = require('mongoose');

const complainSchema = new mongoose.Schema({
  complainNo: {
    type: String,
    required: true,
    unique: true, 
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, 
    lowercase: true, 
  },
  contactNo: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 3, 
    maxlength: 400,
  },
  department: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default:"Open",
    enum: ['Open', 'Closed', 'In Progress'], 
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

const ComplainModela = mongoose.model('complain', complainSchema);

module.exports = ComplainModela;
