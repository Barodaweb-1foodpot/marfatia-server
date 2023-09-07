const mongoose = require('mongoose');

const schemeSchema = new mongoose.Schema({
  SchemeId: {
    type: Number,
  },
  AMCId: {
    type: Number,
  },
  AMCCatId: {
    type: Number,
  },
  SchemeName: {
    type: String,
    required: true,
  },
  SchemeCode: {
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

const amcSchemeModel = mongoose.model('amc_scheme', schemeSchema);

module.exports = amcSchemeModel;
