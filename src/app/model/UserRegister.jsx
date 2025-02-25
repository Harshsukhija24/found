import { Schema, models, model } from "mongoose";

const UserRegisterSchema = new Schema({
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
    unique: true, // Ensure userId is unique
  },
  password: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
});

const UserRegisterModel =
  models.userregister || model("userregister", UserRegisterSchema);

export default UserRegisterModel;
