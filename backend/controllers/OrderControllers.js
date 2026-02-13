import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  try {
    const order = await Order.create({
      ...req.body,
      status: "Order Received",
    });

    // 3 seconds → Preparing
    setTimeout(async () => {
      await Order.findByIdAndUpdate(order._id, {
        status: "Preparing",
      });
      console.log("Updated to Preparing");
    }, 3000);

    // 6 seconds → Out for Delivery
    setTimeout(async () => {
      await Order.findByIdAndUpdate(order._id, {
        status: "Out for Delivery",
      });
      console.log("Updated to Out for Delivery");
    }, 6000);

    // 9 seconds → Delivered
    setTimeout(async () => {
      await Order.findByIdAndUpdate(order._id, {
        status: "Delivered",
      });
      console.log("Updated to Delivered");
    }, 9000);

    res.status(201).json({
  ...order.toObject(),
  id: order._id   // send _id as id
});

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating order" });
  }
};


export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders" });
  }
};

export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    res.status(400).json({ message: "Invalid Order ID" });
  }
};
