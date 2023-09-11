const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  bannerTitle: {
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
  bannerText:{
    type:String
  }
  ,

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

const BannerMasterModel = mongoose.model('banner_master', bannerSchema);

module.exports = BannerMasterModel;
