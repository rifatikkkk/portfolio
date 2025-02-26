import { Router } from "express";
import video from "./videoRoute";
import auth from "./authRoute";
import like from "./likeRoute";

const router = Router();

export default (): Router => {
  video(router);
  auth(router);
  like(router);
  return router;
};
