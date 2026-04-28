import mongoose from "mongoose";
import type { TransactionRecord } from "../types/domain.ts";

const { Schema } = mongoose;

const transactionSchema = new Schema<TransactionRecord>(
  {
    id: {
      type: String,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<TransactionRecord>("Category", transactionSchema);