import { Request, Response } from "express";
import prisma from "../../prisma/prisma-client";
import bcrypt from "bcrypt";

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
