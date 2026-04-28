import mongoose from "mongoose";
import type { UserRecord } from "../types/domain.ts";

const { Schema } = mongoose;

const UserSchema = new Schema<UserRecord>(
  {
    id: {
      type: String,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 2,
    },
  },
  { timestamps: true }
);

export default mongoose.model<UserRecord>("User", UserSchema);