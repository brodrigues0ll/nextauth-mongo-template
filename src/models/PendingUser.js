import mongoose from "mongoose";
const moment = require("moment-timezone");

const PendingUserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  code: {
    type: String,
    required: true,
  },
});

const PendingUser =
  mongoose.models.PendingUser ||
  mongoose.model("PendingUser", PendingUserSchema);

export default PendingUser;
