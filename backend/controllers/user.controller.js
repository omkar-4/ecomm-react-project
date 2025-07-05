/**
 * @controller signup for @route POST /user/signup
 * @controller login for @route POST /user/login
 * @controller logout for @route POST /user/logout
 * @controller getProfile for @route GET /user/profile
 * @controller getProducts for @route GET /user/products
 * @controller getProductsById for @route GET /user/products/:id
 * @controller createOrder for @route GET /user/order/:id
 * @controller verifyPayment for @route GET /user/verify/:id
 */

const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const blacklistModel = require("../models/blacklist.model");
const productModel = require("../models/product.model");
const paymentModel = require("../models/payment.model");
const orderModel = require("../models/order.model");

const Razorpay = require("razorpay");
const { default: payments } = require("razorpay/dist/types/payments");

var instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

module.exports.signup = async (req, res, next) => {
  try {
    const { email, password, username, role } = req.body;
    if (!email || !password || !username)
      return res.status(400).json({ message: "all fields are required" });

    const isUserAlreadyExists = await userModel.findOne({ email });

    if (isUserAlreadyExists)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      email,
      password: hashedPassword,
      username,
      role,
    });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({
      message: "user created successfully",
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const user = await userModel.findOne({ email });

    if (!user)
      return res.status(400).json({
        message: "User not found",
      });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Email or Password" });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1hr",
    });

    res.status(200).json({
      message: "User signed successfully",
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.logout = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) return res.status(400).json({ message: "Token is required" });

    const isTokenBlacklisted = await blacklistModel.findOne({ token });
    if (isTokenBlacklisted)
      return res.status(400).json({ message: "Token is already blacklisted" });

    await blacklistModel.create({ token });
  } catch (error) {
    next(error);
  }
};

module.exports.getProfile = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const user = await userModel.findById(req.user._id);

    res.status(200).json({
      message: "User profile fetched successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getProducts = async (req, res, next) => {
  try {
    const products = await productModel.find({});

    res.status(200).json({
      products,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getProductsById = async (req, res, next) => {
  try {
    const product = await productModel.findById(req.params.id);

    res.status(200).json({
      product,
    });
  } catch (err) {
    next(err``);
  }
};

module.exports.createOrder = async (req, res, next) => {
  try {
    const product = await productModel.findById(req.params.id);

    const option = {
      amount: product.amount * 100,
      currency: "INR",
      receipt: "product._id",
    };

    res.status(200).json({
      order,
    });

    const payment = await paymentModel.create({
      order_id: order.id,
      amount: product.amount,
      currency: "INR",
      status: "pending",
    });
  } catch (error) {
    next(error);
  }
};

module.exports.verifyPayment = async (req, res, next) => {
  try {
    const { paymentId, orderId, signature } = req.body;
    const secret = process.env.RAZORPAY_KEY_SECRET;

    const {
      validatePaymentVerification,
    } = require("../node_modules/razorpay/dist/utils/razorpay-utils"); // returns boolean

    const isValid = validatePaymentVerification(
      {
        order_id: orderId,
        payment_id: paymentId,
      },
      signature,
      secret
    );

    if (isValid) {
      const payment = await paymentModel.findOne({
        orderId: orderId,
      });

      payment.paymentId = paymentId;
      payment.signature = signature;
      payment.status = "success";

      await payment.save();

      res.status(200).json({
        message: "Payment verified successfully",
      });
    } else {
      const payment = await paymentModel.findOne({
        orderId: orderId,
      });

      payment.status = "failed";

      res.status(400).json({
        message: "Payment verification failed",
      });
    }
  } catch (err) {
    next(err);
  }
};
