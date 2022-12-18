const mongoose = require("mongoose");

const tutoringSchema = new mongoose.Schema({
	lektor: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Lektor",
	},
	client: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Client",
	},
	active: {
		type: Boolean,
		default: true,
	},
});

export = mongoose.model("Tutoring", tutoringSchema);
