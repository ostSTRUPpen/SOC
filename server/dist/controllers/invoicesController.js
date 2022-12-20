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
const Client = require("../models/Client");
const Mentor = require("../models/Mentor");
// @desc Get all invoices
// @route GET /invoices
// @access Private
const getAllInvoices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get all invoices from MongoDB
    const invoices = yield Invoice.find().select().lean();
    // No invoices
    if (!invoices.length) {
        return res.status(400).json({ message: "No invoices found" });
    }
    const invoicesWithNames = yield Promise.all(invoices.map((invoice) => __awaiter(void 0, void 0, void 0, function* () {
        const mentor = yield Mentor.findById(invoice.mentor).lean().exec();
        const client = yield Client.findById(invoice.client).lean().exec();
        return Object.assign(Object.assign({}, invoice), { mentor: `${mentor.name} ${mentor.surname}`, client: `${client.name_parent} ${client.surname_parent}` });
    })));
    res.json(invoicesWithNames);
});
exports.getAllInvoices = getAllInvoices;
// @desc Create new invoice
// @route POST /invoices
// @access Private
const createNewInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { mentor, client, value, date } = req.body;
    if (!mentor || !client || !value || !date) {
        return res.status(400).json({
            message: "Všechna pole jsou povinná",
        });
    }
    const duplicate = yield Invoice.findOne({
        mentor: mentor,
        client: client,
        date: date,
        value: value,
    })
        .lean()
        .exec();
    if (duplicate) {
        return res.status(400).json({
            message: `Tato faktura už existuje`,
        });
    }
    const invoiceObject = {
        mentor,
        client,
        date,
        value,
    };
    const invoice = yield Invoice.create(invoiceObject);
    if (invoice) {
        const clientInfo = yield Client.findById(invoice.client).lean().exec();
        res.status(201).json({
            message: `Nová faktura s datem ${date} a částkou ${value} od klienta ${clientInfo.name_parent} ${clientInfo.surname_parent} zaznamenána`,
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
    const { id, mentor, client, value, date } = req.body;
    if (!id || !mentor || !client || !value || !date) {
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
        date: date,
        value: value,
    })
        .lean()
        .exec();
    if (duplicate && (duplicate === null || duplicate === void 0 ? void 0 : duplicate._id.toString()) !== id) {
        return res.status(400).json({
            message: `Tato faktura už existuje`,
        });
    }
    invoiceToUpdate.client = client;
    invoiceToUpdate.mentor = mentor;
    invoiceToUpdate.value = value;
    invoiceToUpdate.date = date;
    const updatedInvoice = yield invoiceToUpdate.save();
    res.json({
        message: `Faktura s datem ${date} a částkou ${value} upravena`,
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
