import express from "express";
import cors from "cors";
import path from "path";
import indexRoutes from "./routes/index.ts";
import timeout from "connect-timeout";
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
    origin: ["http://localhost:5173", "https://financial-management-system-server.vercel.app"],
  }),
);

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

app.get("/api-docs.json", (req, res) => res.json(swaggerDocument));

app.get("/api-docs", (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.send(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>API Docs</title>
    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5.17.14/swagger-ui.css" />
    <style>
      html, body {
        margin: 0;
        padding: 0;
        background: #fafafa;
      }
      #swagger-ui {
        margin: 0;
      }
    </style>
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist@5.17.14/swagger-ui-bundle.js" crossorigin></script>
    <script src="https://unpkg.com/swagger-ui-dist@5.17.14/swagger-ui-standalone-preset.js" crossorigin></script>
    <script>
      window.onload = () => {
        window.ui = SwaggerUIBundle({
          url: "/api-docs.json",
          dom_id: "#swagger-ui",
          deepLinking: true,
          presets: [SwaggerUIBundle.presets.apis, SwaggerUIBundle.SwaggerUIStandalonePreset],
          layout: "BaseLayout",
        });
      };
    </script>
  </body>
</html>`);
});

app.use(indexRoutes);
app.use(errorHandler);

export default app;
