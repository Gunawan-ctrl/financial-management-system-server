import express from "express";
import cors from "cors";
import path from "path";
import indexRoutes from "./routes/index.ts";
import timeout from "connect-timeout";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./documentation/swagger.ts";
import errorHandler from "./middlewares/errorHandler.ts";

const app = express();

app.use(timeout("10s"));

app.use((req, res, next) => {
  if (!req.timedout) next();
});

const assetsPath = path.resolve(process.cwd(), "src/assets");

app.use("/assets", express.static(assetsPath));

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get("/api-docs.json", (req, res) => res.json(swaggerDocument));

app.use(indexRoutes);
app.use(errorHandler);

export default app;
