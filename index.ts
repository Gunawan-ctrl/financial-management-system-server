import mongoose from "mongoose";
import serverless from "serverless-http";
import dbconfig from "./src/config/dbconfig.ts";
import app from "./src/app.ts";

const handler = serverless(app as any);

const allowedOrigins = [
  "http://localhost:5173",
  "https://financial-management-system-server.vercel.app",
];

function setCors(req: any, res: any) {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
}

async function ensureDbConnected() {
  if (mongoose.connection.readyState === 1) return;
  mongoose.set("strictQuery", false);
  await mongoose.connect(dbconfig.MONGO_URL);
}

export default async function (req: any, res: any) {
  setCors(req, res);

  // preflight harus selesai di sini, jangan ke DB
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  try {
    await ensureDbConnected();
    return handler(req, res);
  } catch (err) {
    console.error("DB connection error in serverless handler", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
