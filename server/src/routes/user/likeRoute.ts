import { Router } from "express";
import { authenticatedToken } from "../../middleware/authenticatedToken";
import { likeVideo } from "../../controllers/user/likeController";

export default (router: Router) => {
  router.post("/like/:videoId", authenticatedToken, likeVideo);
};
