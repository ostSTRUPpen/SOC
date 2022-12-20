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
	bank_account: {
		type: String,
		required: true,
	},
	date_of_birth: {
		type: String,
		required: true,
	},
	others: {
		type: Array,
		default: [],
	},
	active: {
		type: Boolean,
		default: true,
	},
});

export = mongoose.model("Lektor", lektorSchema);
