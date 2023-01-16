const Invoice: any = require("../models/Invoice");
const Client: any = require("../models/Client");
const Mentor: any = require("../models/Mentor");

// @desc Get all invoices
// @route GET /invoices
// @access Private
const getAllInvoices = async (req: any, res: any) => {
	// Get all invoices from MongoDB
	const invoices: any = await Invoice.find().select().lean();

	// No invoices
	if (!invoices.length) {
		return res.status(400).json({ message: "Nenalezena žádná data" });
	}

	res.json(invoices);
};

// @desc Create new invoice
// @route POST /invoices
// @access Private
const createNewInvoice = async (req: any, res: any) => {
	const { mentor, client, value, date } = req.body;
	if (!mentor || !client || !value || !date) {
		return res.status(400).json({
			message: "Všechna pole jsou povinná",
		});
	}

	const duplicate = await Invoice.findOne({
		mentor: mentor,
		client: client,
		date: date,
		value: value,
	})
		.lean()
		.exec();
	if (duplicate) {
		return res.status(400).json({
			message: `Tato faktura již existuje`,
		});
	}

	const invoiceObject = {
		mentor,
		client,
		date,
		value,
	};

	const invoice = await Invoice.create(invoiceObject);
	if (invoice) {
		const clientInfo = await Client.findById(invoice.client).lean().exec();
		res.status(201).json({
			message: `Nová faktura s datem ${date} a částkou ${value} od klienta ${clientInfo.name_parent} ${clientInfo.surname_parent} zaznamenána`,
		});
	} else {
		res.status(400).json({ message: `Došlo k chybě` });
	}
};

// @desc Update an invoice
// @route PATCH /invoices
// @access Private
const updateInvoice = async (req: any, res: any) => {
	const { id, mentor, client, value, date } = req.body;
	if (!id || !mentor || !client || !value || !date) {
		return res.status(400).json({
			message: "Všechna pole jsou povinná",
		});
	}

	const invoiceToUpdate: any = await Invoice.findById(id).exec();

	// The invoice does not exist
	if (!invoiceToUpdate) {
		return res.status(400).json({ message: "Faktura nenalezena" });
	}

	const duplicate = await Invoice.findOne({
		mentor: mentor,
		client: client,
		date: date,
		value: value,
	})
		.lean()
		.exec();
	if (duplicate && duplicate?._id.toString() !== id) {
		return res.status(400).json({
			message: `Tato faktura již existuje`,
		});
	}

	invoiceToUpdate.client = client;
	invoiceToUpdate.mentor = mentor;
	invoiceToUpdate.value = value;
	invoiceToUpdate.date = date;

	const updatedInvoice = await invoiceToUpdate.save();

	res.json({
		message: `Faktura s datem ${date} a částkou ${value} upravena`,
	});
};

// @desc Delete an invoice
// @route DELETE /invoices
// @access Private
const deleteInvoice = async (req: any, res: any) => {
	const { id } = req.body;

	if (!id) {
		return res.status(400).json({ message: "Je potřeba ID faktury" });
	}

	const invoiceToDelete = await Invoice.findById(id).exec();

	// Does the invoice exist?
	if (!invoiceToDelete) {
		return res.status(400).json({ message: "Faktura nenalezena" });
	}

	const result = await invoiceToDelete.deleteOne();

	const reply = `Faktura s datem ${result.date} a částkou ${result.value} byla vymazána`;

	res.json(reply);
};

export { getAllInvoices, createNewInvoice, updateInvoice, deleteInvoice };
