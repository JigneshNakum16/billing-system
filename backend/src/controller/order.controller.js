import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Order } from "../models/order.modules.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Add order
const addOrder = asyncHandler(async (req, res) => {
  const { username, userphone, items } = req.body;
  if (!username || !userphone || !items || !items.length) {
    throw new ApiError(
      400,
      "Please provide all required fields (username, userphone, items)."
    );
  }

  const validItems = items.every(
    (item) => item.foodId && item.price && item.quantity
  );
  if (!validItems) {
    throw new ApiError(
      400,
      "Invalid items. Each item must have foodId, price, and quantity."
    );
  }

  const totalAmount = items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
  try {
    // const order = await Order.create({
    //   username,
    //   userphone,
    //   items,
    //   totalAmount,
    // });

    const newOrder = new Order({
      username,
      userphone,
      items,
      totalAmount,
    });
    // Save the order to the database
    await newOrder.save();

    if (!newOrder) {
      throw new ApiError(500, "Order registration failed");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, newOrder, "Order added successfully"));
  } catch (error) {
    throw new ApiError(500, "Something went wrong while adding order");
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
