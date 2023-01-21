"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInvoice = exports.updateInvoice = exports.createNewInvoice = exports.getAllInvoices = void 0;
const Invoice = require("../models/Invoice");
const Tutoring = require("../models/Tutoring");
const Mentor = require("../models/Mentor");
// @desc Get all invoices
// @route GET /invoices
// @access Private
const getAllInvoices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get all invoices from MongoDB
    const invoices = yield Invoice.find().select().lean();
    // No invoices
    if (!invoices.length) {
        return res.status(400).json({ message: "Nenalezena žádná data" });
    }
    res.json(invoices);
});
exports.getAllInvoices = getAllInvoices;
// @desc Create new invoice
// @route POST /invoices
// @access Private
const createNewInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { mentor, client, value, date, tutoring } = req.body;
    if (!mentor || !client || !value || !date || !tutoring) {
        return res.status(400).json({
            message: "Všechna pole jsou povinná",
        });
    }
    const duplicate = yield Invoice.findOne({
        mentor: mentor,
        client: client,
        tutoring: tutoring,
        date: date,
        value: value,
    })
        .collation({ locale: "cs", strength: 2 })
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
        tutoring,
        date,
        value,
    };
    const invoice = yield Invoice.create(invoiceObject);
    if (invoice) {
        res.status(201).json({
            message: `Nová faktura zaznamenána`,
        });
    }
    else {
        res.status(400).json({ message: `Došlo k chybě` });
    }
});
exports.createNewInvoice = createNewInvoice;
// @desc Update an invoice
// @route PATCH /invoices
// @access Private
const updateInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, mentor, client, value, date, tutoring } = req.body;
    if (!id || !mentor || !client || !value || !date || !tutoring) {
        return res.status(400).json({
            message: "Všechna pole jsou povinná",
        });
    }
    const invoiceToUpdate = yield Invoice.findById(id).exec();
    // The invoice does not exist
    if (!invoiceToUpdate) {
        return res.status(400).json({ message: "Faktura nenalezena" });
    }
    const duplicate = yield Invoice.findOne({
        mentor: mentor,
        client: client,
        tutoring: tutoring,
        date: date,
        value: value,
    })
        .collation({ locale: "cs", strength: 2 })
        .lean()
        .exec();
    if (duplicate && (duplicate === null || duplicate === void 0 ? void 0 : duplicate._id.toString()) !== id) {
        return res.status(400).json({
            message: `Tato faktura již existuje`,
        });
    }
    invoiceToUpdate.tutoring = tutoring;
    invoiceToUpdate.mentor = mentor;
    invoiceToUpdate.value = value;
    invoiceToUpdate.date = date;
    const updatedInvoice = yield invoiceToUpdate.save();
    res.json({
        message: `Faktura s datem ${updatedInvoice.date} upravena`,
    });
});
exports.updateInvoice = updateInvoice;
// @desc Delete an invoice
// @route DELETE /invoices
// @access Private
const deleteInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ message: "Je potřeba ID faktury" });
    }
    const invoiceToDelete = yield Invoice.findById(id).exec();
    // Does the invoice exist?
    if (!invoiceToDelete) {
        return res.status(400).json({ message: "Faktura nenalezena" });
    }
    const result = yield invoiceToDelete.deleteOne();
    const reply = `Faktura s datem ${result.date} a částkou ${result.value} byla vymazána`;
    res.json(reply);
});
exports.deleteInvoice = deleteInvoice;
