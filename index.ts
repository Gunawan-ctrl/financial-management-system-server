import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import dbconfig from "./src/config/dbconfig.js";
import indexRoutes from "./src/routes/index.js";
import timeout from "connect-timeout";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./src/documentation/swagger.js";

const app = express();

app.use(timeout("10s"));

app.use((req, res, next) => {
  if (!req.timedout) next();
});

const assetsPath = path.resolve(process.cwd(), "src/assets");

mongoose.set("strictQuery", false);
mongoose
  .connect(dbconfig.MONGO_URL)
  .then(() => console.log("Berhasil terhubung ke database"))
  .catch((err) => console.error("Gagal terhubung ke database", err));

app.use("/assets", express.static(assetsPath));

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get("/api-docs.json", (req, res) => res.json(swaggerDocument));

app.use(indexRoutes);

app.listen(dbconfig.PORT, () => console.log(`Server berjalan di port ${dbconfig.PORT}`));