import { Schema, models, model } from "mongoose";

const UserjobSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserjobModel = models.Userjob || model("Userjob", UserjobSchema);

export default UserjobModel;
