const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const blacklistSchema = new Schema(
	{
		token: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

blacklistSchema.index({ token: 1 }, { unique: true });

const Blacklist = model("blacklist", blacklistSchema);

module.exports = Blacklist;
