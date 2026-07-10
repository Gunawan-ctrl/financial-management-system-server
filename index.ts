import mongoose from "mongoose";
import dbconfig from "./src/config/dbconfig.ts";
import app from "./src/app.ts";

mongoose.set("strictQuery", false);
mongoose
  .connect(dbconfig.MONGO_URL)
  .then(() => console.log("Berhasil terhubung ke database"))
  .catch((err) => console.error("Gagal terhubung ke database", err));

app.listen(dbconfig.PORT, () => console.log(`Server berjalan di port ${dbconfig.PORT}`));