const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	seller: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
		required: true,
	},
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;
