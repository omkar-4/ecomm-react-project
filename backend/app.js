require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
app.use(cors());
const connectDB = require("./config/mongodb");
connectDB();

const PORT = process.env.PORT || 3000;

const indexRoutes = require("./routes/index.routes");
const userRoutes = require("./routes/user.routes");
const productRoutes = require("./routes/products.routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRoutes);
app.use("/user", userRoutes);
app.use("/product", productRoutes);

app.listen(PORT, () => {
  console.log(
    `server is running on port ${PORT}.\nAccess here\x1b[34m http://localhost:${PORT} \x1b[0m`
  );
});
