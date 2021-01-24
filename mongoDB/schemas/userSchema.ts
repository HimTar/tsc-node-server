import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    full_name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    region: {
      country: String,
      city: String,
    },
    profile_image: {
      url: String,
      public_id: String,
    },
    status: {
      type: String,
      default: "deactive",
    },
    myPosts: [String],
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const UserModel = mongoose.model("UserModel", UserSchema);

export default UserModel;
