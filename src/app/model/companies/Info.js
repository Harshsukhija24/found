// In your Info schema file (e.g., Info.js)
import { Schema, model, models } from "mongoose";

const InfoSchema = new Schema({
  founded: {
    type: String,
    required: true,
  },
  location: {
    type: String, // Corrected typo here
    required: true,
  },
  website: {
    type: String, // Corrected typo here
    required: true,
  },
  employees: {
    type: String,
    required: true,
  },
});

export default models.info || model("info", InfoSchema);
