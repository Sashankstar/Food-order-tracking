import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        item_id: String,
        name: String,
        price: Number,
        quantity: Number,
      },
    ],
    delivery_details: {
      name: String,
      address: String,
      phone: String,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "Order Received",
      enum: [
        "Order Received",
        "Preparing",
        "Out for Delivery",
        "Delivered",
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
