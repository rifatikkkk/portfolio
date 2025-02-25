import { Router } from "express";
import { getVideosByTag } from "../../controllers/user/videoController";

export default (router: Router) => {
  router.get("/video/getTags/:tag", getVideosByTag);
};
