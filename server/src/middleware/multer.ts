import multer from "multer";
import path from "path";
import { Request } from "express";
import { FileFilterCallback } from "multer";

export const uploads: multer.Multer = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 100000000 }, // ? need more size
  fileFilter: async (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) => {
    const filetypes = /mp4|MOV|avi/;

    const extname = filetypes.test(path.extname(file.originalname).toString());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      req.file = file;
      return cb(null, true);
    } else {
      return cb(null, false);
    }
  },
});
