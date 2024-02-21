const mongoose = require('mongoose');

const contectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // Removes leading/trailing whitespaces
  },
  contactNo: {
    type: String,
    required: true,
    trim: true,
  },
  subject: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true, // Store email addresses in lowercase
    validate: {
      validator: function (value) {
        // Use a regular expression to validate email format
        return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value);
      },
      message: 'Invalid email format',
    },
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
});

const contectModel = mongoose.model('quick_contect_model', contectSchema);

module.exports = contectModel;
