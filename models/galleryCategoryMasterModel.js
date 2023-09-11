const mongoose = require('mongoose');

const gallaryCatSchema = new mongoose.Schema({
  gallaryCategoryTitle: {
    type: String,
    required: true,
    minlength: 3, 
    maxlength: 20,
  },
  description: {
    type: String,
    required: true,
    minlength: 3, 
    maxlength: 400,
  },
  imagePath: {
    type: String,
    required:true
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

const gallaryCategoryModel = mongoose.model('gallary_category_master', gallaryCatSchema);

module.exports = gallaryCategoryModel;
