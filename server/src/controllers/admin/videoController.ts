import { Request, Response } from "express";
import prisma from "../../prisma/prisma-client";

export const addVideo = async (req: Request, res: Response) => {
  const { description } = req.body;

  try {
    const video = await prisma.video.create({
      data: {
        description: description || undefined,
        url: res.locals.downloadURL,
      },
    });

    res.status(200).json(video);
  } catch (error) {
    console.error("Error in add Video", error);
    res.status(500).json({ error: "Internal server error!" });
  }
};
