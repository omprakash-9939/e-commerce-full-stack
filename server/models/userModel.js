import mongoose from "mongoose";

// create user schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    cartData: {
      type: Object,
      default: {},
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { minimize: false , timestamps: true }
);

// minimize: false
// Mongoose keeps empty objects instead of removing them.

// user model

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;

// It prevents "OverwriteModelError" by reusing the model if it already exists.
