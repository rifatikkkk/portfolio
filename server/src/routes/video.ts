import { Router } from "express";
import { get } from "../controllers/video";

export default (router: Router) => {
  router.get("/video", get);
};
