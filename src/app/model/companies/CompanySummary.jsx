import { Schema, model, models } from "mongoose";

const CompanySummarySchema = new Schema({
  // Fields from Company schema
  companyName: { type: String, required: true },
  bio: { type: String, required: true },
  userId: { type: String, required: true },
  overview: { type: String, required: true },
  culture: { type: String, required: true },
  benefit: { type: String, required: true },

  // Fields from Info schema
  founded: { type: String, required: true },
  location: { type: String, required: true },
  website: { type: String, required: true },
  employees: { type: String, required: true },

  // Fields from Postajob schema
  JobDescription: { type: String, required: true },
  ExperienceRequired: { type: String, required: true },
  JobLink: { type: String, required: true },
  JobLocation: { type: String, required: true },
  SalaryRange: { type: String, required: true },
  KeyResponsibilities: { type: String, required: true },
  Qualifications: { type: String, required: true },
  DateofJoining: { type: String, required: true },
  skuId: { type: String, required: true },

  // Fields from Team schema
  founderName: { type: String, required: true },
  founderLocation: { type: String, required: true },
  founderPastExperience: { type: String, required: true },
  coFounderName: { type: String, required: true },
  coFounderLocation: { type: String, required: true },
  coFounderPastExperience: { type: String, required: true },
});

export default models.CompanySummary ||
  model("CompanySummary", CompanySummarySchema);
