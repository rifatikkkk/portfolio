import { Request, Response } from "express";
import prisma from "../../prisma/prisma-client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req: Request, res: Response) => {
  const { name, password } = req.body;

  if (!name || !password) {
    res.status(400).json({ error: "You need input all fields!" });
    return;
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { name } });

    if (existingUser) {
      res.status(400).json({ error: "User existing already!" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        password: hashedPassword,
        avatarUrl: "", // write default "" in schema
      },
    });

    res.status(200).json(user);
  } catch (error) {
    console.error("Error in Register User", error);
    res.status(500).json({ error: "Internal server error!" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { name, password } = req.body;

  if (!name || !password) {
    res.status(400).json({ error: "You need input all fields!" });
    return;
  }

  try {
    const user = await prisma.user.findUnique({ where: { name } });

    if (!user) {
      res.status(400).json({ error: "Wrong login or password!" });
      return;
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      res.status(400).json({ error: "Wrong login or password!" });
      return;
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.SECRET_KEY as string
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error in Login User", error);
    res.status(500).json({ error: "Internal server error!" });
  }
};
