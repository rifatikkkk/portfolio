import { Router } from "express";
import {
  getPersonVideo,
  getVideosByTag,
} from "../../controllers/user/videoController";

export default (router: Router) => {
  router.get("/video/getTags/:tag", getVideosByTag);
  router.get("/video/getPerson/:name", getPersonVideo);
};
