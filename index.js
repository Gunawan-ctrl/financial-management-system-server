import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import dbconfig from "./src/config/dbconfig.js";
import { fileURLToPath } from "url";
import indexRoutes from "./src/routes/index.js";
import timeout from "connect-timeout";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./src/config/swagger.js";

const app = express();

// Middleware Timeout (misalnya, 10 detik)
app.use(timeout("10s"));

// Middleware untuk menangani timeout
app.use((req, res, next) => {
  if (!req.timedout) next();
});

// Get __dirname in ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database configuration
mongoose.set("strictQuery", false);
mongoose.connect(dbconfig.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // serverSelectionTimeoutMS: 5000,
  // socketTimeoutMS: 45000,
})
  .then(() => console.log("Berhasil terhubung ke database"))
  .catch((err) => console.error("Gagal terhubung ke database", err));

// Middleware
app.use('/assets', express.static(path.join(__dirname, './src/assets')));

app.use(cors({
  origin: "http://localhost:3000"
  // origin: "https://hoffmann-lane.gunawann.com"
}));
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get("/api-docs.json", (req, res) => res.json(swaggerDocument));

// Routes
app.use(indexRoutes);

// Start server
app.listen(dbconfig.PORT, () => console.log(`Server berjalan di port ${dbconfig.PORT}`));
