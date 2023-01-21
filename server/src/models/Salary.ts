const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const salarySchema = new mongoose.Schema(
	{
		mentor: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Mentor",
		},
		lektor: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Lektor",
		},
		tutoring: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Tutoring",
		},
		date: {
			type: String,
			required: true,
		},
		value: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

salarySchema.plugin(AutoIncrement, {
	inc_field: "salary_number",
	id: "salaryNum",
	start_seq: 0,
});

export = mongoose.model("Salary", salarySchema);
