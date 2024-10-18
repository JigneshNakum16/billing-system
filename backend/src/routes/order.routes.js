import { Router } from "express";
import { addOrder, getAllOrder } from "../controller/order.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/addOrder").post(addOrder);
router.route("/getOrder").get(verifyJwt, getAllOrder);

export default router;
