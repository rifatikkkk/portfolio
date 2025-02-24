import { Router } from "express";
import { addVideo } from "../../controllers/admin/videoController";
import { uploads } from "../../middleware/multer";
import { uploadVideo } from "../../middleware/uploadVideo";

export default (router: Router) => {
  router.post("/video", uploads.single("video"), uploadVideo, addVideo);
};
