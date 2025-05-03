import { Router } from "express";
import { getTags } from "../../controllers/user/tagController";

export default (router: Router) => {
  router.get("/tag", getTags);
};
