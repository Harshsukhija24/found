import { Schema, models, model } from "mongoose";

const PostajobSchema = new Schema({
  skuId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  companyBio: {
    type: String,
    required: true,
  },
  companyLocation: {
    type: String,
    required: true,
  },
  companyDescription: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  coverLetter: {
    type: String,
    required: true,
  },
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
  relocation: {
    type: Boolean,
    required: true,
  },
  authorized: {
    type: Boolean,
    required: true,
  },
  jobType: String,
  openToJobTypes: [String],
  desiredLocations: [String],
  openToRemoteWork: Boolean,
  desiredSalary: String,
  companySizes: [String],
  applicantName: {
    type: String,
    required: true,
  },
  applicantLocation: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  applicantBio: {
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

export default models.Postajob || model("Postajob", PostajobSchema);
