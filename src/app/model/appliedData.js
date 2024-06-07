import { models, model, Schema } from "mongoose";

const appliedDataSchema = new Schema({
  skuId: {
    type: String,
    required: true,
  },
  company_name: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
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
});

export default models.AppliedData || model("AppliedData", appliedDataSchema);
