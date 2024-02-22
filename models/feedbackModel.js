const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  fName: {
    type: String,
    required: true,
    trim: true,
  },
  lName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (value) {
        return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value);
      },
      message: 'Invalid email format',
    },
  },
  contactNo: {
    type: String,
    required: true,
    trim: true,
  },
  modeOfCommute: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  feedback: {
    type: String,
    required: true,
    trim: true,
  },
});

const feedbackModel = mongoose.model('feedbackModel', feedbackSchema);

module.exports = feedbackModel;
