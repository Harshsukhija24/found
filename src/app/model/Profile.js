const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
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
});

const profile = mongoose.model("profile", profileSchema);
module.exports = profile;
