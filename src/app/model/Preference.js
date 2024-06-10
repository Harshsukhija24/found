import { Schema, models, model } from "mongoose";

const PreferencesSchema = new Schema({
  userId: {
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
  jobtype: String,
  openToJobTypes: [String],
  desiredLocations: String,
  openToRemoteWork: Boolean,
  desiredSalary: String,
  companySizes: [String],
});

export default models.Preferences || model("Preferences", PreferencesSchema);
