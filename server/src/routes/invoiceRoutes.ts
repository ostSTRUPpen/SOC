const express = require("express");
const router = express.Router();
const invoiceController = require("../controllers/invoicesController");

router
	.route("/")
	.get(invoiceController.getAllInvoices)
	.post(invoiceController.createNewInvoice)
	.patch(invoiceController.updateInvoice)
	.delete(invoiceController.deleteInvoice);

export = router;
