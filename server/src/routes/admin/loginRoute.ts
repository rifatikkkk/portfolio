import { Router } from "express";
import { loginAdmin } from "../../controllers/loginController";

export default (router: Router) => {
  router.post("/login", loginAdmin);
};
