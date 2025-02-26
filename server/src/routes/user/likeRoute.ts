import { Router } from "express";
import { authenticatedToken } from "../../middleware/authenticatedToken";
import { likeVideo, unLikeVideo } from "../../controllers/user/likeController";

export default (router: Router) => {
  router.post("/like/:videoId", authenticatedToken, likeVideo);
  router.delete("/unlike/:videoId", authenticatedToken, unLikeVideo);
};
