const upload = require("../config/multer.config");
const authMiddleware = require("../middlewares/auth.middleware");
const productController = require("../controllers/products.controller");

const router = require("express").Router();

router.use(authMiddleware.isAuthenticated).use(authMiddleware.isSeller);

router.post("/create-product", upload.any(), productController.createProduct);

module.exports = router;
