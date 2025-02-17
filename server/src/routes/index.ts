import { Router } from "express";
import video from "./video";

const router = Router();

export default (): Router => {
  video(router);
  return router;
};
