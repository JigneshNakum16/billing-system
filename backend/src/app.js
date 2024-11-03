import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3002",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

import adminRouter from "./routes/admin.routes.js";
import foodRouter from "./routes/food.routes.js";
import orderRouter from "./routes/order.routes.js";

app.use("/api/admin", adminRouter);
app.use("/api/food", foodRouter);
app.use("/api/order", orderRouter);

export { app };
