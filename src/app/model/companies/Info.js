import { Schema, models, model } from "mongoose";

const InfoSchema = new Schema({
  CompanyName: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  Overview: {
    type: String,
    required: true,
  },
  culture: {
    type: String,
    required: true,
  },
  Benefits: {
    type: String,
    required: true,
  },
});

export default models.info || model("info", InfoSchema);
