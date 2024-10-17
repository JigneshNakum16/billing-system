import { Router } from "express";
import { adminLogin, adminRegister } from "../controller/admin.controller.js";

const router = Router();

router.route("/register").post(adminRegister);
router.route("/login").post(adminLogin);

export default router;
