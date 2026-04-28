import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

type JwtPayload = {
  id?: string;
  email?: string;
  role?: number;
};

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      code: 401,
      status: false,
      message: "Token tidak ditemukan",
    });
  }

  const token = authHeader.split(" ")[1];
  const secret = process.env.JWT_SECRET || "development-secret-key";

  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;
    res.locals.user = decoded;
    next();
  } catch {
    return res.status(401).json({
      code: 401,
      status: false,
      message: "Token tidak valid atau sudah kedaluwarsa",
    });
  }
};

export default authenticateToken;