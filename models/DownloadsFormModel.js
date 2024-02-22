const mongoose = require('mongoose');

const DownloadsSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
    minlength: 3, 
  },
  
  filePath: {
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

const DownloadFormModel = mongoose.model('downloa_forms_master', DownloadsSchema);

module.exports = DownloadFormModel;
