import { Request, Response } from "express";
import prisma from "../../prisma/prisma-client";

export const likeVideo = async (req: Request, res: Response) => {
  const { videoId } = req.params;
  const { userId } = res.locals.decoded;

  console.log(videoId);

  const isValidObjectId = /^[a-fA-F0-9]{24}$/.test(videoId); // check correct video id ?
  if (!isValidObjectId) {
    console.error("Invalid ObjectID format:", videoId);
    res.status(400).json({ error: "Invalid Id!" });

    return;
  }

  try {
    const video = await prisma.video.findUnique({
      where: { id: videoId },
    });

    console.log(video);
    if (!video) {
      res.status(400).json({ error: "Video not found!" });
      return;
    }

    const existingLike = await prisma.like.findFirst({
      where: {
        userId,
        videoId,
      },
    });

    if (existingLike) {
      res.status(400).json({ error: "You are already liked this video!" });
      return;
    }

    const like = await prisma.like.create({
      data: {
        videoId,
        userId,
      },
    });

    res.status(201).json(like);
  } catch (error) {
    console.error("Error in Like Video", error);
    res.status(500).json({ error: "Internal server error!" });
  }
};
