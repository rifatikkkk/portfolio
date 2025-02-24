import { Router } from "express";
import { loginAdmin } from "../../controllers/admin/loginController";

export default (router: Router) => {
  router.post("/login", loginAdmin);
};
