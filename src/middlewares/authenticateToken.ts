import type { NextFunction, Request, Response } from "express";
import requestResponse from "../utils/response.ts";
import jwt from "jsonwebtoken";

type JwtPayload = {
  id?: string;
  email?: string;
  role?: number;
};

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json(requestResponse.unauthorized("Token tidak ditemukan"));
  }

  const token = authHeader.split(" ")[1];
  const secret = process.env.JWT_SECRET || "development-secret-key";

  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;
    res.locals.user = decoded;
    next();
  } catch {
    return res.status(401).json(requestResponse.unauthorized("Token tidak valid"));
  }
};

export default authenticateToken;