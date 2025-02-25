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

export const getPersonVideo = async (req: Request, res: Response) => {
  const { secretCode } = req.body;
  const { name } = req.params;
  try {
    const personVideos = await prisma.person.findUnique({
      where: {
        name,
        secretCode,
      },
      include: {
        videos: true,
      },
      omit: {
        secretCode: true,
      },
    });

    // rewrite code with "if"
    if (!personVideos) {
      res.status(404).json({ error: "Person not found!" });
      return;
    }

    if (personVideos.videos.length === 0) {
      res.status(204).json({ message: "Person don't have videos!" });
      return;
    }

    res.status(200).json(personVideos);
  } catch (error) {
    console.error("Error in get Person videos", error);
    res.status(500).json({ error: "Internal server error!" });
  }
};
