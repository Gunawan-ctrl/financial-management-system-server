import { configDotenv } from "dotenv";

configDotenv();

// const MONGO_URL = process.env.NODE_ENV === 'production' ?
//   process.env.MONGO_PROD : process.env.MONGO_DEV
const MONGO_URL = process.env.MONGO_DEV

const PORT = process.env.PORT || 4000

export default { MONGO_URL, PORT }