const mongoose = require("mongoose");

const mentorSchema = new mongoose.Schema({
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
		default: "nenastaveno",
	},
	email: {
		type: String,
		default: "nenastaveno",
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
	},
	others: {
		type: Array,
		default: [],
	},
	active: {
		type: Boolean,
		default: true,
	},
	role: {
		type: String,
		default: "mentor",
	},
});

export = mongoose.model("Mentor", mentorSchema);
