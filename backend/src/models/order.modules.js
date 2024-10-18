import mongoose, { Schema } from "mongoose";

const OrderItemsSchema = new Schema({
  foodId: {
    type: Schema.Types.ObjectId,
    ref: "Food",
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
      trim: true,
    },
    userphone: {
      type: Number,
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
