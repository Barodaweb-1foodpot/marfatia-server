const mongoose = require('mongoose');

const AMCcategorySchema = new mongoose.Schema({
    CategoryName: {
    type: String,
    required: true,
    minlength: 3
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

const AMCcategory = mongoose.model('AMC_category', AMCcategorySchema);

module.exports = AMCcategory;
