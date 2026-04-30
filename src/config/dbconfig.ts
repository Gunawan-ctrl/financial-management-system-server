import { configDotenv } from "dotenv";

configDotenv();

const MONGO_URL = process.env.MONGO_DEV;
const PORT = process.env.PORT || 5000;

export default { MONGO_URL, PORT };