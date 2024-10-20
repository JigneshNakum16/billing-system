import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Food } from "../models/food.modules.js";

// Add food
const addFood = asyncHandler(async (req, res) => {
  const { foodName, price, category, description } = req.body;
  if (
    [foodName, price, category, description].some(
      (field) => field?.toString()?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  try {
    const food = await Food.create({
      foodName,
      price,
      category,
      description,
    });

    if (!food) {
      throw new ApiError(500, "Food registration failed");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, food, "Food added successfully"));
  } catch (error) {
    throw new ApiError(500, "Something went wrong while adding food");
  }
});

// Update food
const updateFood = asyncHandler(async (req, res) => {
  const { foodName, price, category, description } = req.body;
  const { id } = req.params;
  if (
    [foodName, price, category, description].some(
      (field) => field?.toString()?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  try {
    const food = await Food.findByIdAndUpdate(
      id,
      {
        foodName,
        price,
        category,
        description,
      },
      { new: true }
    );

    if (!food) {
      throw new ApiError(500, "Food update failed");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, food, "Food updated successfully"));
  } catch (error) {
    throw new ApiError(500, "Something went wrong while updating food");
  }
});

// Delete food
const deleteFood = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const food = await Food.findByIdAndDelete(id);
    if (!food) {
      throw new ApiError(404, "Food not found");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Food deleted successfully"));
  } catch (error) {
    throw new ApiError(500, "Something went wrong while deleting food");
  }
});

//Get all food
const getAllFood = asyncHandler(async (req, res) => {
  try {
    const food = await Food.find();
    if (!food) {
      throw new ApiError(404, "Food not found");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, food, "All food fetched successfully"));
  } catch (error) {
    throw new ApiError(500, "Something went wrong while getting food");
  }
});
export { addFood, updateFood, deleteFood, getAllFood };
