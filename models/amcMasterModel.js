const mongoose = require('mongoose');

const amcSchema = new mongoose.Schema({
  AMCId: {
    type: Number
  },  AMCName: {
    type: String,
    required: true
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
  deletedAt:{
    type:Date,
  }
});

const AMCMaster = mongoose.model('AMC_Master', amcSchema);

module.exports = AMCMaster;
