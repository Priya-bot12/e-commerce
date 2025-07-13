import orderModel from "../models/orderModel";
import userModel from "../models/userModel";
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const currency = 'usd'
// POST /api/order/place (COD)
const placeOrder = async (req, res) => {
  try {
    const newOrder = new Order({
      address: req.body.address,
      items: req.body.items,
      amount: req.body.amount,
      paymentMethod: 'cod',
      status: 'Processing',
      userId: req.userId // assuming you're using middleware to set this
    });

    await newOrder.save();
    res.status(200).json({ success: true, message: 'Order placed successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Order placement failed', error });
  }
};

// POST /api/order/place-stripe
const placeOrderStripe = async (req, res) => {
  try {
    const newOrder = new Order({
      address: req.body.address,
      items: req.body.items,
      amount: req.body.amount,
      paymentMethod: 'stripe',
      status: 'Paid',
      userId: req.userId
    });

    await newOrder.save();
    res.status(200).json({ success: true, message: 'Stripe order placed successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Stripe order failed', error });
  }
};

// POST /api/order/place-razorpay
const placeOrderRazorpay = async (req, res) => {
  try {
    const newOrder = new Order({
      address: req.body.address,
      items: req.body.items,
      amount: req.body.amount,
      paymentMethod: 'razorpay',
      status: 'Paid',
      userId: req.userId
    });

    await newOrder.save();
    res.status(200).json({ success: true, message: 'Razorpay order placed successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Razorpay order failed', error });
  }
};

// GET /api/order/all
const allOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch orders', error });
  }
};

// GET /api/order/user
const userOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch user orders', error });
  }
};

// PATCH /api/order/update-status/:id
const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true });

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.status(200).json({ success: true, message: 'Status updated', order: updatedOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update status', error });
  }
};

module.exports = {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus
};
