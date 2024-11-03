import { Router } from "express";
import { addOrder, getAllOrder, sendSMS } from "../controller/order.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/addOrder").post(addOrder);
router.route("/send-sms").post(sendSMS);
router.route("/getOrder").get(verifyJwt, getAllOrder);


export default router;
