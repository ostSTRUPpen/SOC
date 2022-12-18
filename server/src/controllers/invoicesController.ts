const Invoice: any = require("../models/Invoice");

// @desc Get all invoices
// @route GET /invoices
// @access Private
const getAllInvoices = async (req: any, res: any) => {
	res.json({ message: "OK" });
};

// @desc Create new invoice
// @route POST /invoices
// @access Private
const createNewInvoice = async (req: any, res: any) => {};

// @desc Update a invoice
// @route PATCH /invoices
// @access Private
const updateInvoice = async (req: any, res: any) => {};

// @desc Delete a invoice
// @route DELETE /invoices
// @access Private
const deleteInvoice = async (req: any, res: any) => {};

export { getAllInvoices, createNewInvoice, updateInvoice, deleteInvoice };
