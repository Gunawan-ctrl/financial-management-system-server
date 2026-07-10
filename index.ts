// api/index.ts
import mongoose from "mongoose";
import serverless from "serverless-http";
import dbconfig from "./src/config/dbconfig.ts";
import app from "./src/app.ts";

const handler = serverless(app as any);

async function ensureDbConnected() {
  if (mongoose.connection.readyState === 1) return;
  mongoose.set("strictQuery", false);
  await mongoose.connect(dbconfig.MONGO_URL);
}

export default async function (req: any, res: any) {
  // penting: preflight jangan kena DB
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,DELETE,OPTIONS",
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization",
    );
    return res.status(204).end();
  }

  try {
    await ensureDbConnected();
    return handler(req, res);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
