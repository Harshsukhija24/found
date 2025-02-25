import { Schema, models, model } from "mongoose";

const CultureSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Userjob",
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
});

export default models.Culture || model("Culture", CultureSchema);
