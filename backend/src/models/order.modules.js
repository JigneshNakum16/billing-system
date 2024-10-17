import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {

    username: {
      type: String,
      required: true,
      trim: true,
    },
    phone : {
        type : Number,
        required : true,
        unique : true,
    },
    foodId: {
      type: Schema.Types.ObjectId,
      ref: "Food",
    },
    price : {
        type : Number,
        required : true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Order = mongoose.model("Order", orderSchema);
