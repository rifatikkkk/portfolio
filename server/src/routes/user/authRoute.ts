import { Router } from "express";
import { registerUser } from "../../controllers/user/authController";

export default (router: Router) => {
  router.post("/register", registerUser);
};
