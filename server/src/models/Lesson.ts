const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const lessonSchema = new mongoose.Schema({
	tutoring: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Tutoring",
	},
	date: {
		type: Date,
		required: true,
	},
	theme: {
		type: String,
		required: true,
	},
	length: {
		type: String,
		required: true,
		default: 60,
	},
	info: {
		type: String,
		required: true,
	},
});

lessonSchema.plugin(AutoIncrement, {
	inc_field: "lesson_number",
	id: "lessonNum",
	start_seq: 0,
});

export = mongoose.model("Lesson", lessonSchema);
