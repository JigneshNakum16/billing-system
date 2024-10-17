import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Admin } from "../models/admin.modules.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessAndRefreshToken = async (adminId) => {
  try {
    const admin = await Admin.findById(adminId);
    const accessToken = admin.generateAccessToken();
    const refreshToken = admin.generateRefreshToken();

    admin.refreshToken = refreshToken;
    await admin.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "something went wrong while generating access and refresh token"
    );
  }
};

const adminRegister = asyncHandler(async (req, res) => {
  const { name, username, phone, address, password } = req.body;
  if (
    [name, username, phone, address, password].some(
      (field) => field?.toString()?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existingAdmin = await Admin.findOne({
    $or: [{ username }, { phone }],
  });

  if (existingAdmin) {
    throw new ApiError(400, "Admin already exists");
  }

  try {
    const admin = await Admin.create({
      name,
      username: username.toLowerCase(),
      phone,
      address,
      password,
    });

    const createdAdmin = await Admin.findById(admin._id).select(
      "-password -refreshToken"
    );

    if (!createdAdmin) {
      throw new ApiError(500, "Admin registration failed");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, createdAdmin, "Admin registered successfully")
      );
  } catch (error) {
    console.error(`Error during registration admin: ${error}`);
    throw new ApiError(500, "Admin registration failed");
  }
});

const adminLogin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username && !password) {
    throw new ApiError(400, "username and password is must be required");
  }

  const admin = await Admin.findOne({
    $or: [{ username }, { password }],
  });

  if (!admin) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await admin.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    admin._id
  );

  const loggedIn = await Admin.findById(admin._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(201)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        201,
        { admin: loggedIn, accessToken, refreshToken },
        "Admin logged in successfully"
      )
    );
});

export { adminRegister, adminLogin };
