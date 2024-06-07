import { Schema, models, model } from "mongoose";

const PostajobSchema = new Schema({
  JobDescription: {
    type: String,
    required: true,
  },
  ExperienceRequired: {
    type: String,
    required: true,
  },
  JobLink: {
    type: String,
    required: true,
  },
  JobLocation: {
    type: String,
    required: true,
  },
  SalaryRange: {
    type: String,
    required: true,
  },
  KeyResponsibilities: {
    type: String,
    required: true,
  },
  Qualifications: {
    type: String,
    required: true,
  },
  DateofJoining: {
    type: String,
    required: true,
  },
  skuId: {
    type: String,
    required: true,
  },
});

export default models.Postajob || model("Postajob", PostajobSchema);
