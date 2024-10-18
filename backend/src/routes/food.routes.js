import { Router } from "express";
import {
  addFood,
  deleteFood,
  getAllFood,
  updateFood,
} from "../controller/food.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/addFood").post(verifyJwt,addFood);
router.route("/getFood").get(getAllFood);
router.route("/updateFood/:id").put(verifyJwt,updateFood);
router.route("/deleteFood/:id").delete(verifyJwt,deleteFood);

export default router;
