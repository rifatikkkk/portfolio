import { Router } from "express";
import video from "./videoRoute";

const router = Router();

export default (): Router => {
  video(router);
  return router;
};
