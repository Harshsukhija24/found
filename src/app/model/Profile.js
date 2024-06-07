import { Schema, models, model } from "mongoose";

const ProfileSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
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

export default models.Profile || model("Profile", ProfileSchema);
