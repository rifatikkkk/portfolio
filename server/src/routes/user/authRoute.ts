import { Router } from "express";
import { loginUser, registerUser } from "../../controllers/user/authController";

export default (router: Router) => {
  router.post("/register", registerUser);
  router.post("/login", loginUser);
};
