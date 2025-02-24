import { Router } from "express";
import {
  addPersonVideo,
  addSimpleVideo,
  addTagsVideo,
} from "../../controllers/admin/videoController";
import { uploads } from "../../middleware/multer";
import { uploadVideo } from "../../middleware/uploadVideo";

export default (router: Router) => {
  router.post(
    "/video/simple",
    uploads.single("video"),
    uploadVideo,
    addSimpleVideo
  );
  router.post(
    "/video/tag/:tags",
    uploads.single("video"),
    uploadVideo,
    addTagsVideo
  );
  router.post(
    "/video/person/:name",
    uploads.single("video"),
    uploadVideo,
    addPersonVideo
  );
};
