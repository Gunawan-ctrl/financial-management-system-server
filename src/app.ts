// src/app.ts
import express from "express";
import cors from "cors";
import path from "path";
import timeout from "connect-timeout";
import indexRoutes from "./routes/index.ts";
import swaggerDocument from "./documentation/swagger.ts";
import errorHandler from "./middlewares/errorHandler.ts";

const app = express();

app.use(timeout("10s"));
app.use((req, _res, next) => {
  if (!req.timedout) next();
});

app.use(cors());
app.options("*", cors());

const assetsPath = path.resolve(process.cwd(), "src/assets");
app.use("/assets", express.static(assetsPath));

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

app.get("/api-docs.json", (_req, res) => res.json(swaggerDocument));

app.get("/api-docs", (_req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.send(`<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>API Docs</title>
    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css" />
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
    <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-standalone-preset.js"></script>
    <script>
      window.onload = () => {
        SwaggerUIBundle({
          url: "/api-docs.json",
          dom_id: "#swagger-ui",
          presets: [SwaggerUIBundle.presets.apis, SwaggerUIBundle.SwaggerUIStandalonePreset],
        });
      };
    </script>
  </body>
</html>`);
});

app.use(indexRoutes);
app.use(errorHandler);

export default app;
