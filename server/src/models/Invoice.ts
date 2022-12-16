const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const invoiceSchema = new mongoose.Schema(
	{
		mentor: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Mentor",
		},
		client: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Klient",
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

invoiceSchema.plugin(AutoIncrement, {
	inc_field: "invoice_number",
	id: "invoiceNum",
	start_seq: 0,
});

export = mongoose.model("Invoice", invoiceSchema);
