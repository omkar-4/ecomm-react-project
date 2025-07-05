const productModel = require("../models/product.model");

express.createProduct = async (req, res, next) => {
  try {
    const { name, description, price } = req.body;

    // console.log(req.files.forEach((file) => console.log(file.publicUrl)));
    const images = req.files
      .map((file) => file.publicUrl)
      .filter((url) => (url ? true : false));

    console.log(images);

    if ((!name, !description, !price))
      return res.status(400).json({ message: "All fields are required" });

    const product = await productModel.create({
      name,
      description,
      price,
      images: req.files.map((file) => file.path),
    });

    res.status(201).json({ message: "Product created successfully", product });
  } catch (err) {
    res.status(500).json(err);
  }
};
