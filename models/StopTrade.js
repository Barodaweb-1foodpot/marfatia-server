const mongoose = require("mongoose");

const stopTradeSchema = new mongoose.Schema(
  {
    clientCode: {
      type: String,
      required: true,
    },
    registeredEmail: {
      type: String,
      required: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);

const stopTrade = mongoose.model("stopTrade", stopTradeSchema);

module.exports = stopTrade;
