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
exports.deleteClient = exports.updateClient = exports.createNewClient = exports.getAllClients = void 0;
const Lektor = require("../models/Lektor");
const Mentor = require("../models/Mentor");
const Client = require("../models/Client");
const Invoice = require("../models/Invoice");
const Tutoring = require("../models/Tutoring");
const bcrypt = require("bcrypt");
// @desc Get all clients
// @route GET /clients
// @access Private
const getAllClients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get all clients from MongoDB
    const clients = yield Client.find().select("-password").lean();
    // No clients
    if (!clients.length) {
        return res.status(400).json({ message: "Nenalezena žádná data" });
    }
    res.json(clients);
});
exports.getAllClients = getAllClients;
// @desc Create new client
// @route POST /clients
// @access Private
const createNewClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { mentor, username, password, name_parent, surname_parent, name_child, surname_child, gmail_parent, email_parent, phone_num_parent, gmail_child, email_child, phone_num_child, bank_account, date_of_birth_child, others, } = req.body;
    // Required fields
    if (!mentor ||
        !username ||
        !password ||
        !name_parent ||
        !name_child ||
        !surname_parent ||
        !surname_child ||
        !phone_num_parent ||
        !phone_num_child ||
        !email_parent ||
        !date_of_birth_child) {
        return res.status(400).json({
            message: "Veškerá pole, kromě data narození dítěte, emailu a gmailu na rodiče i děti, jsou povinná",
        });
    }
    // Duplicates
    const foundClient = yield Client.findOne({ username })
        .collation({ locale: "cs", strength: 2 })
        .lean()
        .exec();
    const foundLektor = yield Lektor.findOne({ username })
        .collation({ locale: "cs", strength: 2 })
        .lean()
        .exec();
    const foundMentor = yield Mentor.findOne({ username })
        .collation({ locale: "cs", strength: 2 })
        .lean()
        .exec();
    const duplicate = foundMentor
        ? foundMentor
        : foundLektor
            ? foundLektor
            : foundClient
                ? foundClient
                : undefined;
    if (duplicate) {
        return res.status(400).json({
            message: `TODO`,
        });
    }
    // Password hash
    const hashedPassword = yield bcrypt.hash(password, 10); //10 salt rounds
    // Creation
    const clientObject = {
        mentor,
        username,
        password: hashedPassword,
        name_parent,
        surname_parent,
        name_child,
        surname_child,
        gmail_parent,
        email_parent,
        phone_num_parent,
        gmail_child,
        email_child,
        phone_num_child,
        bank_account,
        date_of_birth_child,
        others,
    };
    // Saving to database
    const client = yield Client.create(clientObject);
    //Output
    if (client) {
        res.status(201).json({ message: `Nový uživatel ${username} vytvořen` });
    }
    else {
        res.status(400).json({ message: `Došlo k chybě` });
    }
});
exports.createNewClient = createNewClient;
// @desc Update a client
// @route PATCH /clients
// @access Private
const updateClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, mentor, username, password_old, password_new, name_parent, surname_parent, name_child, surname_child, gmail_parent, email_parent, phone_num_parent, gmail_child, email_child, phone_num_child, bank_account, date_of_birth_child, others, active, } = req.body;
    // All fields except password, gmail, email are required
    if (!mentor ||
        !username ||
        !name_parent ||
        !name_child ||
        !surname_parent ||
        !surname_child ||
        !phone_num_parent ||
        !phone_num_child ||
        !date_of_birth_child ||
        !email_parent ||
        typeof active !== "boolean") {
        return res.status(400).json({
            message: "Veškerá pole, kromě hesla, bankovního účtu a emailu či gmailu na rodiče i děti, jsou povinná" /*+
            ` ${[
                id,
                mentor,
                username,
                name_parent,
                surname_parent,
                name_child,
                surname_child,
                phone_num_parent,
                phone_num_child,
                date_of_birth_child,
                typeof active,
            ]}`,*/,
        });
    }
    const clientToUpdate = yield Client.findById(id).exec();
    // The client does not exist
    if (!clientToUpdate) {
        return res.status(400).json({ message: "Klient nenalezen" });
    }
    // Looking for a duplicate (except the one being updated)
    const foundClient = yield Client.findOne({ username })
        .collation({ locale: "cs", strength: 2 })
        .lean()
        .exec();
    const foundLektor = yield Lektor.findOne({ username })
        .collation({ locale: "cs", strength: 2 })
        .lean()
        .exec();
    const foundMentor = yield Mentor.findOne({ username })
        .collation({ locale: "cs", strength: 2 })
        .lean()
        .exec();
    const duplicate = foundMentor
        ? foundMentor
        : foundLektor
            ? foundLektor
            : foundClient
                ? foundClient
                : undefined;
    if (duplicate && (duplicate === null || duplicate === void 0 ? void 0 : duplicate._id.toString()) !== id) {
        return res.status(400).json({
            message: `TODO`,
        });
    }
    clientToUpdate.mentor = mentor;
    clientToUpdate.username = username;
    clientToUpdate.name_parent = name_parent;
    clientToUpdate.surname_parent = surname_parent;
    clientToUpdate.phone_num_parent = phone_num_parent;
    clientToUpdate.name_child = name_child;
    clientToUpdate.surname_child = surname_child;
    clientToUpdate.phone_num_child = phone_num_child;
    clientToUpdate.bank_account = bank_account;
    clientToUpdate.date_of_birth_child = date_of_birth_child;
    clientToUpdate.active = active;
    clientToUpdate.email_parent = email_parent;
    // Changing password, email, gamil
    if (password_old) {
        if (yield bcrypt.compare(password_old, clientToUpdate.password)) {
            clientToUpdate.password = yield bcrypt.hash(password_new, 10);
        }
        else {
            return res.status(400).json({
                message: `Zadáno chybné heslo`,
            });
        }
    }
    if (gmail_parent) {
        clientToUpdate.gmail_parent = gmail_parent;
    }
    if (gmail_child) {
        clientToUpdate.gmail_child = gmail_child;
    }
    if (email_child) {
        clientToUpdate.email_child = email_child;
    }
    if (others) {
        clientToUpdate.others = others;
    }
    const updatedClient = yield clientToUpdate.save();
    res.json({ message: `${updatedClient.username} upraven` });
});
exports.updateClient = updateClient;
// @desc Delete a client
// @route DELETE /clients
// @access Private
const deleteClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    // ID is required
    if (!id) {
        return res.status(400).json({ message: "Je potřeba ID klienta" });
    }
    // No tutorings or invoices are connected to the client
    const tutoring = yield Tutoring.findOne({ client: id }).lean().exec();
    if (tutoring) {
        return res
            .status(400)
            .json({ message: "Ke klientovi jsou vázaná doučování" });
    }
    const invoices = yield Invoice.findOne({ client: id }).lean().exec();
    if (invoices) {
        return res
            .status(400)
            .json({ message: "Ke klientovi jsou vázané faktury" });
    }
    const clientToDelete = yield Client.findById(id).exec();
    // Does the client exist?
    if (!clientToDelete) {
        return res.status(400).json({ message: "Klient nenalezen" });
    }
    const result = yield clientToDelete.deleteOne();
    const reply = `Klient ${result.username} s ID ${result._id} smazán`;
    res.json(reply);
});
exports.deleteClient = deleteClient;
