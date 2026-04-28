import mongoose from "mongoose";
import requestResponse from "../config/response.js";

const validateObjectId = (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json(requestResponse.gagal("ID tidak valid"));
  }

  next();
};

export default validateObjectId;
