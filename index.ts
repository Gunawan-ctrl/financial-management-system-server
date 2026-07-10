// import mongoose from "mongoose";
// import dbconfig from "./src/config/dbconfig.ts";
// import app from "./src/app.ts";

// mongoose.set("strictQuery", false);
// mongoose
//   .connect(dbconfig.MONGO_URL)
//   .then(() => console.log("Berhasil terhubung ke database"))
//   .catch((err) => console.error("Gagal terhubung ke database", err));

// app.listen(dbconfig.PORT, () => console.log(`Server berjalan di port ${dbconfig.PORT}`));

import mongoose from "mongoose";
import dbconfig from "./src/config/dbconfig.ts";
import app from "./src/app.ts";

let dbConnected = false;

export default async function handler(req: any, res: any) {
  try {
    if (!dbConnected) {
      mongoose.set("strictQuery", false);
      await mongoose.connect(dbconfig.MONGO_URL);
      dbConnected = true;
    }

    return app(req, res);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}