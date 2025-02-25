const mongoose = require("mongoose");

// Combined schema
const trySchema = new mongoose.Schema({
  // User information
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  // Profile information
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  website: String,
  linkedin: String,
  github: String,
  twitter: String,
  company: String,
  title: String,
  description: String,
  education: String,
  skills: String,
  achievement: String,
  // Preferences
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
  // Culture
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

const Try = mongoose.model("Try", trySchema);
module.exports = Try;
