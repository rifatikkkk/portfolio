import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app, { auth } from "../config/firebase.config";
import { Request, Response, NextFunction } from "express";
import { giveCurrentDateTime } from "../utils/giveCurrentDateTime";

export const uploadVideo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!req.file) {
    res.status(400).json({ error: "Error loading file!" });
    return;
  }

  try {
    if (auth.currentUser != null) {
      const storage = getStorage(app);

      const dateTime = giveCurrentDateTime();

      let fullPath = "";

      switch (req.route.path) {
        case "/video/simple":
          fullPath = `video/simple_video/video_${dateTime}.mp4`;
          break;

        case "/video/tag/:tags":
          fullPath = `video/tag_video/${req.params.tags}/video_${dateTime}.mp4`; // split some tags ?
          break;

        case "/video/person/:name":
          fullPath = `video/person_video/${req.params.name}/video_${dateTime}.mp4`;
          break;

        default:
          break;
      }
      const storageRef = ref(storage, fullPath);

      const metadata = {
        contentType: req.file.mimetype,
      };

      const snapshot = await uploadBytesResumable(
        storageRef,
        req.file.buffer,
        metadata
      );

      const downloadURL = await getDownloadURL(snapshot.ref);
      res.locals.downloadURL = downloadURL;
      next();
    } else {
      res.status(400).json({ error: "You are not auth!" });
      return;
    }
  } catch (error) {
    console.error("Error in upload Video", error);
    res.status(500).json({ error: "Internal server error!" });
  }
};
