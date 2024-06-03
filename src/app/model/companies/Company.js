import { Schema, models, model } from "mongoose";

const CompanySchema = new Schema({
  companyName: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  overview: {
    type: String,
    required: true,
  },
  culture: {
    type: String,
    required: true,
  },
  benefit: {
    type: String,
    required: true,
  },
});

export default models.Company || model("Company", CompanySchema);
