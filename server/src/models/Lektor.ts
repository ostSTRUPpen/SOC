const mongoose = require("mongoose");

const lektorSchema = new mongoose.Schema({
	mentor: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Mentor",
	},
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	surname: {
		type: String,
		required: true,
	},
	gmail: {
		type: String,
	},
	email: {
		type: String,
	},
	phone_num: {
		type: String,
		required: true,
	},
	active: {
		type: Boolean,
		default: true,
	},
});

export = mongoose.model("Lektor", lektorSchema);
