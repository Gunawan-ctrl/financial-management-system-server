import mongoose from "mongoose";
import type { CategoryRecord } from "../types/domain.js";

const { Schema } = mongoose;

const CategorySchema = new Schema<CategoryRecord>(
  {
    id: {
      type: String,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<CategoryRecord>("Category", CategorySchema);