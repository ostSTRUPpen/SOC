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
	gmail: [
		{
			type: String,
		},
	],
	email: [
		{
			type: String,
		},
	],
	phone_num: [
		{
			type: String,
			required: true,
		},
	],
	active: {
		type: Boolean,
		default: true,
	},
});

export = mongoose.model("Mentor", mentorSchema);
