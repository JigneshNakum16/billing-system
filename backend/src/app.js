import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

import adminRouter from "./routes/admin.routes.js";
import foodRouter from "./routes/food.routes.js"
import orderRouter from "./routes/order.routes.js"

app.use("/api/admin", adminRouter);
app.use("/api/food", foodRouter);
app.use("/api/order",orderRouter)

export { app };
