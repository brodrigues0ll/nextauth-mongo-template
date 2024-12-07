import mongoose from "mongoose";
const moment = require("moment-timezone");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  recoveryCode: {
    type: String,
    default: null,
  },
  recoveryCodeExpires: {
    type: String,
    default: null,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    default: moment.tz("America/Sao_Paulo").format(),
  },
  updatedAt: {
    type: String,
    default: moment.tz("America/Sao_Paulo").format(),
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
