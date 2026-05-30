import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// INFO: Placing orders using COD Method
const placeOrder = async (req, res) => {
  try {
    const { userId, firstName, lastName, items, amount, address } = req.body;
    const orderData = {
      userId,
      firstName,
      lastName,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date(),
    };

    const order = new orderModel(orderData);
    await order.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// INFO: Placing orders using Stripe Method
const placeOrderStripe = async (req, res) => {
  // Implementation for Stripe
};

// INFO: Placing orders using Razorpay Method
const placeOrderRazorpay = async (req, res) => {
  // Implementation for Razorpay
};

// INFO: All Orders data for Admin panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// INFO: User Order Data For Forntend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// INFO: Update order status from Admin Panel
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus };