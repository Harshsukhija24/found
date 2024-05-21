// CultureSchema.js
const mongoose = require("mongoose");

const CultureSchema = new mongoose.Schema({
  nextJob: {
    type: String,
    required: true,
  },
  motivate: {
    type: String,
    required: true,
  },
  future: {
    type: String,
    required: true,
  },
  environment: {
    type: String,
    required: true,
  },
});

const Culture = mongoose.model("Culture", CultureSchema);
module.exports = Culture;
