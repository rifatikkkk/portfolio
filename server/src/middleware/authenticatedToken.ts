import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";

export const authenticatedToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];

    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      res.status(401).json({ error: "Unauthorized!" });
      return;
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY as Secret);
    res.locals.decoded = decoded;

    next();
  } catch (error) {
    console.error("Error in Authenticated Token", error);
    res.status(401).send("Please authenticate!");
  }
};
