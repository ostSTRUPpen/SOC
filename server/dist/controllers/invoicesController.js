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
// @desc Get all invoices
// @route GET /invoices
// @access Private
const getAllInvoices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ message: "OK" });
});
exports.getAllInvoices = getAllInvoices;
// @desc Create new invoice
// @route POST /invoices
// @access Private
const createNewInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.createNewInvoice = createNewInvoice;
// @desc Update a invoice
// @route PATCH /invoices
// @access Private
const updateInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.updateInvoice = updateInvoice;
// @desc Delete a invoice
// @route DELETE /invoices
// @access Private
const deleteInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.deleteInvoice = deleteInvoice;
