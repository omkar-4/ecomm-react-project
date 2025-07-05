const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

/**
 * @route POST /user/signup
 * @route POST /user/login
 * @route POST /user/logout
 *
 * @route GET /user/profile
 * @route GET /user/products
 * @route GET /user/products/:id
 * @route GET /user/order/:id
 * @route GET /user/verify/:id
 */

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/logout", userController.logout);

router.get(
  "/profile",
  authMiddleware.isAuthenticated,
  userController.getProfile
);

router.get(
  "/products",
  authMiddleware.isAuthenticated,
  userController.getProducts
);

router.get(
  "/products/:id",
  authMiddleware.isAuthenticated,
  userController.getProductById
);

router.get(
  "/order/:id",
  authMiddleware.isAuthenticated,
  userController.getOrderById
);

router.get(
  "/verify/:id",
  authMiddleware.isAuthenticated,
  userController.verify
);

module.exports = router;
