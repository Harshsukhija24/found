import { Schema, model, models } from "mongoose";

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
  },
  company: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserRegister =
  models.UserRegister || model("UserRegister", UserRegisterSchema);

export default UserRegister;
