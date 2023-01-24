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
			ref: "Client",
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
		invoice_number: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

invoiceSchema.plugin(AutoIncrement, {
	inc_field: "incremented_invoice_number",
	id: "incrementedInvoiceNumber",
	start_seq: 0,
});

export = mongoose.model("Invoice", invoiceSchema);
