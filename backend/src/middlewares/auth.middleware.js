import { Admin } from "../models/admin.modules.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";

export const verifyJwt = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.headers.authorization?.replace("Bearer ", "");
 
    if (!token) {
      return next(new ApiError(400, "Please authenticate using valid token"));
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const admin = await Admin.findById(decoded._id).select(
      "-password -refreshToken"
    );

    if (!admin) {
      return next(new ApiError(401, "Unauthorized request"));
    }

    req.admin = admin;

    next();
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return next(new ApiError(401, "Invalid or expired token"));
    }

    next(new ApiError(401, error.message || "Unauthorized request"));
  }
});
