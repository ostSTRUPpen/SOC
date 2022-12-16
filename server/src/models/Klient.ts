const mongoose = require("mongoose");

const klientSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	name_parent: {
		type: String,
		required: true,
	},
	surname_parent: {
		type: String,
		required: true,
	},
	name_child: {
		type: String,
		required: true,
	},
	surname_child: {
		type: String,
		required: true,
	},
	subject: {
		type: String,
		required: true,
	},
	gmail_parent: {
		type: String,
	},
	email_parent: {
		type: String,
	},
	gmail_child: {
		type: String,
	},
	email_child: {
		type: String,
	},
	phone_num_parent: {
		type: String,
		required: true,
	},
	phone_num_child: {
		type: String,
		required: true,
	},
	active: {
		type: Boolean,
		default: true,
	},
});

export = mongoose.model("Klient", klientSchema);
