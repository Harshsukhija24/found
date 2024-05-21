const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  data: {
    type: Buffer,
    required: true,
  },
  contentType: {
    type: String,
  },
});

const Resume = mongoose.model("Resume", resumeSchema);

module.exports = Resume;
