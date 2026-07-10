import mongoose from "mongoose";
import serverless from "serverless-http";
import dbconfig from "../src/config/dbconfig.ts";
import app from "../src/app.ts";

const handler = serverless(app as any);

async function ensureDbConnected() {
  if (mongoose.connection.readyState === 1) return;
  mongoose.set("strictQuery", false);
  await mongoose.connect(dbconfig.MONGO_URL);
}

export default async function (req: any, res: any) {
  try {
    await ensureDbConnected();
    return handler(req, res);
  } catch (err) {
    console.error("DB connection error in serverless handler", err);
    res.status(500).json({ message: "Internal server error" });
  }
}
