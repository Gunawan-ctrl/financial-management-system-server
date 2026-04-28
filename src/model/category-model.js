import mongoose from "mongoose";

const { Schema } = mongoose;

const CategorySchema = new Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  },

}, { timestamps: true });

export default mongoose.model("Category", CategorySchema);
