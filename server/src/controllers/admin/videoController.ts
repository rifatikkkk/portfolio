import { Request, Response } from "express";
import prisma from "../../prisma/prisma-client";

export const addSimpleVideo = async (req: Request, res: Response) => {
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

export const addTagsVideo = async (req: Request, res: Response) => {
  const { description } = req.body;
  const { tags } = req.params;

  try {
    if (tags) {
      const tagsFilter = tags?.split(",");

      const assignTags = await prisma.video.create({
        data: {
          description: description || undefined,
          url: res.locals.downloadURL,
          tags: {
            create: tagsFilter.map((tag) => ({
              tag: {
                connectOrCreate: {
                  where: {
                    name: tag,
                  },
                  create: {
                    name: tag,
                  },
                },
              },
            })),
          },
        },
      });
      res.status(200).json(assignTags);
    } else {
      res.status(400).json({ error: "You need add tags!" });
    }
  } catch (error) {
    console.error("Error in create Tag Video", error);
    res.status(500).json({ error: "Internal server error!" });
  }
};
