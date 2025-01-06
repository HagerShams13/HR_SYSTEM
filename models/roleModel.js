import mongoose from "mongoose";
const { Schema, model } = mongoose;
const RoleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    permissions: {
      type: [String], // Example: ["create_user", "read_user", "delete_user"]
      default: [],
    },
  },
  { timestamps: true }
);

export const Role = model("Role", RoleSchema);
