import verifyJWT from "../middleware/verifyJWT";

const express = require("express");
const router = express.Router();
const invoiceController = require("../controllers/invoicesController");

router.use(verifyJWT);

router
	.route("/")
	.get(invoiceController.getAllInvoices)
	.post(invoiceController.createNewInvoice)
	.patch(invoiceController.updateInvoice)
	.delete(invoiceController.deleteInvoice);

export = router;
