import { Router } from "express";
import {
  addFood,
  deleteFood,
  getAllFood,
  updateFood,
} from "../controller/food.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJwt);
router.route("/addFood").post(addFood);
router.route("/getFood").get(getAllFood);
router.route("/updateFood/:id").put(updateFood);
router.route("/deleteFood/:id").delete(deleteFood);

export default router;
