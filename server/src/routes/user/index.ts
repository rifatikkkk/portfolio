import { Router } from "express";
import video from "./videoRoute";
import auth from "./authRoute";

const router = Router();

export default (): Router => {
  video(router);
  auth(router);
  return router;
};
