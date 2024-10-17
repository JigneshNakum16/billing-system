import { Admin } from "../models/admin.modules.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";

export const verifyJwt = asyncHandler(async (req, res, next) => {
  try {
    // Retrieve token from cookies or authorization header
    const token =
      req.cookies?.token || req.headers.authorization?.replace("Bearer ", "");


    // If no token, throw an unauthorized error
    if (!token) {
      return next(new ApiError(400, "Unauthorized request"));
    }

    // Verify the token using the secret
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log({ decoded });

    // Find the admin by ID and exclude password and refresh token
    const admin = await Admin.findById(decoded._id).select(
      "-password -refreshToken"
    );
    console.log({ admin });

    // If no admin found, throw an unauthorized error
    if (!admin) {
      return next(new ApiError(401, "Unauthorized request"));
    }

    // Attach the admin object to the request object
    req.admin = admin;

    // Proceed to the next middleware
    next();
  } catch (error) {
    // Catch JWT errors (invalid token, expired token, etc.)
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return next(new ApiError(401, "Invalid or expired token"));
    }

    // Handle other errors
    next(new ApiError(401, error.message || "Unauthorized request"));
  }
});
