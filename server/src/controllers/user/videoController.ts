import { Request, Response } from "express";
import prisma from "../../prisma/prisma-client";

export const getVideosByTag = async (req: Request, res: Response) => {
  const { tag } = req.params;

  try {
    const videos = await prisma.video.findMany({
      where: {
        tags: {
          some: {
            tag: {
              name: tag,
            },
          },
        },
      },
    });

    if (videos.length === 0) {
      res.status(404).json({ error: "Videos not found with that tags!" });
      return;
    }

    res.status(200).json(videos);
  } catch (error) {
    console.error("Error in get videos by Tag", error);
    res.status(500).json({ error: "Internal server error!" });
  }
};
