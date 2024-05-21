const mongoose = require("mongoose");

const PreferenceSchema = new mongoose.Schema({
  relocation: {
    type: Boolean,
    required: true,
  },
  authorized: {
    type: Boolean,
    required: true,
  },
  jobtype: String,
  openToJobTypes: [String],
  desiredLocations: String,
  openToRemoteWork: Boolean,
  desiredSalary: String,
  companySizes: [String],
});

const Preference = mongoose.model("PreferenceSchema", PreferenceSchema);
module.exports = PreferenceSchema;
