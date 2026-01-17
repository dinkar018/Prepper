import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET!;

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = req.headers.authorization;
  console.log("AUTH HEADER:", auth);

  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = auth.split(" ")[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET) as any;
    req.user = { id: payload.userId };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
