import { Router } from "express";
import video from "./videoRoute";
import login from "./loginRoute";

const router = Router();

export default (): Router => {
  video(router);
  login(router);
  return router;
};
