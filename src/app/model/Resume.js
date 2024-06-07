import { Schema, models, model } from "mongoose";

const resumeSchema = new Schema({
  filename: {
    type: String,
    required: true,
  },
  data: {
    type: Buffer,
    required: true,
  },
  mimetype: {
    type: String,
    required: true,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
});

const Resume = models.Resume || model("Resume", resumeSchema);

export default Resume;
