import type { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import requestResponse from "../config/response.ts";

const validateObjectId = (req: Request, res: Response, next: NextFunction) => {
  const id = String(req.params.id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json(requestResponse.gagal("ID tidak valid"));
  }

  next();
};

export default validateObjectId;