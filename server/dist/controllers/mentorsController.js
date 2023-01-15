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
exports.deleteMentor = exports.updateMentor = exports.createNewMentor = exports.getAllMentors = void 0;
const Mentor = require("../models/Mentor");
const Salary = require("../models/Salary");
const Lektor = require("../models/Lektor");
const Invoice = require("../models/Invoice");
const Klient = require("../models/Client");
const bcrypt = require("bcrypt");
// @desc Get all mentors
// @route GET /mentors
// @access Private
const getAllMentors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get all mentors from MongoDB
    const mentors = yield Mentor.find().select("-password").lean();
    // No mentors
    if (!mentors.length) {
        return res.status(400).json({ message: "Nenalezena žádná data" });
    }
    res.json(mentors);
});
exports.getAllMentors = getAllMentors;
// @desc Create new mentor
// @route POST /mentors
// @access Private
const createNewMentor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, name, surname, gmail, email, phone_num, bank_account, date_of_birth, others, } = req.body;
    // Required fields
    if (!username ||
        !password ||
        !name ||
        !surname ||
        !phone_num ||
        !bank_account) {
        return res.status(400).json({
            message: "Pole uživatelské jméno, heslo, jméno, příjmení, telefoní číslo a bankovní účet jsou povinná",
        });
    }
    // Duplicates
    if (yield Mentor.findOne({ username }).lean().exec()) {
        return res.status(400).json({
            message: `Mentor s uživatelksým jménem: ${username} již existuje`,
        });
    }
    // Password hash
    const hashedPassword = yield bcrypt.hash(password, 10); //10 salt rounds
    // Creation
    const mentorObject = {
        username,
        password: hashedPassword,
        name,
        surname,
        gmail,
        email,
        phone_num,
        bank_account,
        date_of_birth,
        others,
    };
    // Saving to database
    const mentor = yield Mentor.create(mentorObject);
    //Output
    if (mentor) {
        res.status(201).json({ message: `Nový mentor ${username} vytvořen` });
    }
    else {
        res.status(400).json({ message: `Došlo k chybě` });
    }
});
exports.createNewMentor = createNewMentor;
// @desc Update a mentor
// @route PATCH /mentors
// @access Private
const updateMentor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, username, password, name, surname, gmail, email, phone_num, bank_account, date_of_birth, others, active, } = req.body;
    // All fields except password, gmail, email are required
    if (!id ||
        !username ||
        !name ||
        !surname ||
        !phone_num ||
        typeof active !== "boolean" ||
        !bank_account) {
        res.status(400).json({
            message: "Všechna pole, kromě hesla, gmailu, emailu a data narození, jsou povinná",
        });
    }
    const mentorToUpdate = yield Mentor.findById(id).exec();
    // The mentor does not exist
    if (!mentorToUpdate) {
        return res.status(400).json({ message: "Mentor nenalezen" });
    }
    // Looking for a duplicate (except the one being updated)
    const duplicate = yield Mentor.findOne({ username }).lean().exec();
    if (duplicate && (duplicate === null || duplicate === void 0 ? void 0 : duplicate._id.toString()) !== id) {
        return res.status(400).json({
            message: `Mentor s uživatelským jménem: ${username} již existuje`,
        });
    }
    mentorToUpdate.username = username;
    mentorToUpdate.name = name;
    mentorToUpdate.surname = surname;
    mentorToUpdate.phone_num = phone_num;
    mentorToUpdate.bank_account = bank_account;
    mentorToUpdate.active = active;
    // Changing password, email, gamil
    if (password) {
        mentorToUpdate.password = yield bcrypt.hash(password, 10);
    }
    if (gmail) {
        mentorToUpdate.gmail = gmail;
    }
    if (email) {
        mentorToUpdate.email = email;
    }
    if (date_of_birth) {
        mentorToUpdate.date_of_birth = date_of_birth;
    }
    if (others) {
        mentorToUpdate.others = others;
    }
    const updatedMentor = yield mentorToUpdate.save();
    res.json({ message: `${updatedMentor.username} upraven` });
});
exports.updateMentor = updateMentor;
// @desc Delete a mentor
// @route DELETE /mentors
// @access Private
const deleteMentor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    // ID is required
    if (!id) {
        return res.status(400).json({ message: "Je potřeba ID mentora" });
    }
    const salaries = yield Salary.findOne({ mentor: id }).lean().exec();
    if (salaries) {
        return res
            .status(400)
            .json({ message: "K mentorovi jsou vázané výplaty" });
    }
    const invoices = yield Invoice.findOne({ mentor: id }).lean().exec();
    if (invoices) {
        return res
            .status(400)
            .json({ message: "K mentorovi jsou vázané faktury" });
    }
    const lektors = yield Lektor.findOne({ mentor: id }).lean().exec();
    if (lektors) {
        return res
            .status(400)
            .json({ message: "K mentorovi jsou vázaní lektoři" });
    }
    const klients = yield Klient.findOne({ mentor: id }).lean().exec();
    if (klients) {
        return res
            .status(400)
            .json({ message: "K mentorovi jsou vázaní klienti" });
    }
    const mentorToDelete = yield Mentor.findById(id).exec();
    // Does the mentor exist?
    if (!mentorToDelete) {
        return res.status(400).json({ message: "Mentor nenalezen" });
    }
    const result = yield mentorToDelete.deleteOne();
    const reply = `Mentor ${result.username} s ID ${result._id} smazán`;
    res.json(reply);
});
exports.deleteMentor = deleteMentor;
