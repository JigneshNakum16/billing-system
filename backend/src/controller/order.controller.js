import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Order } from "../models/order.modules.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Add order

const addOrder = asyncHandler(async (req, res) => {
  const { username, userphone, items } = req.body;

  if (!username || !userphone || !items || !items.length) {
    throw new ApiError(400, "Please provide all required fields.");
  }

  const validItems = items.every(
    (item) => item.foodId && item.price && item.quantity
  );
  if (!validItems) {
    throw new ApiError(400, "Each item must have foodId, price, and quantity.");
  }

  const totalAmount = items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);


  try {
    const newOrder = new Order({
      username,
      userphone,
      items,
      totalAmount,
    });
    await newOrder.validate();
    await newOrder.save();

    return res
      .status(200)
      .json(new ApiResponse(200, newOrder, "Order added successfully"));
  } catch (error) {
    // Log the exact error message
    console.error("Error while adding order:", error.message);
    throw new ApiError(500, `Something went wrong: ${error.message}`);
  }
});


//Get all orders
const getAllOrder = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    if (!orders) {
      throw new ApiError(404, "No orders found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, orders, "Orders fetched successfully"));
  } catch (error) {
    throw new ApiError(500, "something went to wrong while fetching orders");
  }
});

export { addOrder, getAllOrder };
