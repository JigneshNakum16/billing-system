import mongoose, { Schema } from "mongoose";

const OrderItemsSchema = new Schema({
  foodId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Food",
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const orderSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    userphone: {
      type: String,
      required: true,
    },
    items: [OrderItemsSchema],
    totalAmount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Order = mongoose.model("Order", orderSchema);
