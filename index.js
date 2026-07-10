// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import path from "path";
// import dbconfig from "./src/config/dbconfig.ts";
// import indexRoutes from "./src/routes/index.ts";
// import timeout from "connect-timeout";
// import swaggerUi from "swagger-ui-express";
// import swaggerDocument from "./src/documentation/swagger.ts";
// import errorHandler from "./src/middlewares/errorHandler.ts";

// const app = express();

// app.use(timeout("10s"));

// app.use((req, res, next) => {
//   if (!req.timedout) next();
// });

// const assetsPath = path.resolve(process.cwd(), "src/assets");

// mongoose.set("strictQuery", false);
// mongoose
//   .connect(dbconfig.MONGO_URL)
//   .then(() => console.log("Berhasil terhubung ke database"))
//   .catch((err) => console.error("Gagal terhubung ke database", err));

// app.use("/assets", express.static(assetsPath));

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//   }),
// );
// app.use(express.json({ limit: "20mb" }));
// app.use(express.urlencoded({ extended: true, limit: "20mb" }));

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.get("/api-docs.json", (req, res) => res.json(swaggerDocument));

// app.use(indexRoutes);
// app.use(errorHandler);
// app.listen(dbconfig.PORT, () => console.log(`Server berjalan di port ${dbconfig.PORT}`));

// index.ts
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
import timeout from "connect-timeout";
import swaggerUi from "swagger-ui-express";
import dotenv from 'dotenv';

// Import tanpa .ts (cukup nama file)
import dbconfig from "./src/config/dbconfig.js";
import indexRoutes from "./src/routes/index.js";
import swaggerDocument from "./src/documentation/swagger.js";
import errorHandler from "./src/middlewares/errorHandler.js";

// Load .env hanya di development
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

console.log('🚀 Starting server...');
console.log('🔧 NODE_ENV:', process.env.NODE_ENV);
console.log('🔗 MONGO_URI exists:', !!process.env.MONGO_URI);

// ============================
// MIDDLEWARE
// ============================

app.use(timeout("10s"));

app.use((req, res, next) => {
    if (req.timedout) {
        return res.status(503).json({
            success: false,
            message: "Request timeout"
        });
    }
    next();
});

const assetsPath = path.join(__dirname, "src", "assets");
app.use("/assets", express.static(assetsPath));

// CORS - fleksibel
const corsOptions = {
    origin: process.env.CORS_ORIGIN 
        ? process.env.CORS_ORIGIN.split(',') 
        : ['http://localhost:5173', 'https://*.vercel.app'],
    credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

// ============================
// DATABASE CONNECTION (AMAN UNTUK VERCEL)
// ============================
mongoose.set("strictQuery", false);

const connectDB = async () => {
    try {
        // Gunakan MONGO_URI dari environment (Vercel) atau dari config
        const mongoUrl = process.env.MONGO_URI || dbconfig.MONGO_URL;
        
        if (!mongoUrl) {
            console.error('❌ MongoDB URL is not defined!');
            return;
        }
        
        console.log('📡 Connecting to MongoDB...');
        await mongoose.connect(mongoUrl);
        console.log('✅ MongoDB connected successfully');
        console.log(`📚 Database: ${mongoose.connection.name}`);
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        // JANGAN exit process di production!
        if (process.env.NODE_ENV !== 'production') {
            process.exit(1);
        }
    }
};

connectDB();

// ============================
// ROUTES
// ============================

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get("/api-docs.json", (req, res) => res.json(swaggerDocument));

// HEALTH CHECK (PENTING UNTUK TEST)
app.get("/health", (req, res) => {
    const dbStatus = mongoose.connection.readyState;
    const statusMap = {
        0: 'disconnected',
        1: 'connected',
        2: 'connecting',
        3: 'disconnecting'
    };
    
    res.status(200).json({
        success: true,
        status: 'OK',
        environment: process.env.NODE_ENV || 'development',
        database: statusMap[dbStatus] || 'unknown',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Financial Management System API',
        version: '1.0.0',
        endpoints: {
            health: '/health',
            docs: '/api-docs',
            api: '/api'
        }
    });
});

// Main routes
app.use(indexRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Error handler
app.use(errorHandler);

// ============================
// ✅ EKSPOR UNTUK VERCEL (WAJIB!)
// ============================
export default app;

// ============================
// 🚀 RUN SERVER (HANYA UNTUK DEVELOPMENT)
// ============================
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`🚀 Server berjalan di port ${PORT}`);
        console.log(`📚 Environment: ${process.env.NODE_ENV || 'development'}`);
        console.log(`📖 Swagger: http://localhost:${PORT}/api-docs`);
        console.log(`🏥 Health: http://localhost:${PORT}/health`);
    });
}