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

      let type = "video";
      let folder = "";

      switch (req.route.path) {
        case "/video/simple":
          folder = "simple_video";
          break;

        case "/video/tag/:tags":
          folder = "tag_video";
          break;

        case "/video/person/:name":
          folder = "person_video";
          break;

        default:
          break;
      }
      const storageRef = ref(
        storage,
        `${type}/${folder}/video_${dateTime}.mp4`
      );

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
