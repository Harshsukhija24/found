// model/companies/Team.js
import { Schema, model, models } from "mongoose";

const TeamSchema = new Schema({
  founderName: {
    type: String,
    required: true,
  },
  founderLocation: {
    type: String,
    required: true,
  },
  founderPastExperience: {
    type: String,
    required: true,
  },
  coFounderName: {
    type: String,
    required: true,
  },
  coFounderLocation: {
    type: String,
    required: true,
  },
  coFounderPastExperience: {
    type: String,
    required: true,
  },
});

export default models.Team || model("Team", TeamSchema);
