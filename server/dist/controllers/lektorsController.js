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
exports.deleteLektor = exports.updateLektor = exports.createNewLektor = exports.getAllLektors = void 0;
const Lektor = require("../models/Lektor");
const Salary = require("../models/Salary");
const Tutoring = require("../models/Tutoring");
const bcrypt = require("bcrypt");
// @desc Get all lektors
// @route GET /lektors
// @access Private
const getAllLektors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get all lektors from MongoDB
    const lektors = yield Lektor.find().select("-password").lean();
    // No lektors
    if (!lektors.length) {
        return res.status(400).json({ message: "Nenalezena žádná data" });
    }
    res.json(lektors);
});
exports.getAllLektors = getAllLektors;
// @desc Create new lektor
// @route POST /lektors
// @access Private
const createNewLektor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { mentor, username, password, name, surname, gmail, email, phone_num, date_of_birth, bank_account, others, } = req.body;
    // Required fields
    if (!mentor ||
        !username ||
        !password ||
        !name ||
        !surname ||
        !phone_num ||
        !date_of_birth ||
        !bank_account) {
        return res.status(400).json({
            message: "Pole zodpovídající lektor, uživatelské jméno, heslo, jméno, příjmení, bankovní účet, datum narození a telefoní číslo jsou povinná",
        });
    }
    // Duplicates
    if (yield Lektor.findOne({ username }).lean().exec()) {
        return res.status(400).json({
            message: `Lektor s uživatelksým jménem: ${username} již existuje`,
        });
    }
    // Password hash
    const hashedPassword = yield bcrypt.hash(password, 10); //10 salt rounds
    // Creation
    const lektorObject = {
        mentor,
        username,
        password: hashedPassword,
        name,
        surname,
        gmail,
        email,
        phone_num,
        date_of_birth,
        bank_account,
        others,
    };
    // Saving to database
    const lektor = yield Lektor.create(lektorObject);
    //Output
    if (lektor) {
        res.status(201).json({ message: `Nový lektor ${username} vytvořen` });
    }
    else {
        res.status(400).json({ message: `Došlo k chybě` });
    }
});
exports.createNewLektor = createNewLektor;
// @desc Update a lektor
// @route PATCH /lektors
// @access Private
const updateLektor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, mentor, username, password, name, surname, gmail, email, phone_num, date_of_birth, bank_account, others, active, } = req.body;
    // All fields except password, gmail, email are required
    if (!id ||
        !mentor ||
        !username ||
        !name ||
        !surname ||
        !phone_num ||
        typeof active !== "boolean" ||
        !date_of_birth ||
        !bank_account) {
        return res.status(400).json({
            message: `Pole zodpovídající mentor, uživatelské jméno, jméno, příjmení, bankovní účet, datum narození, telefoní číslo a aktivní jsou povinná`,
        });
    }
    const lektorToUpdate = yield Lektor.findById(id).exec();
    // The lektor does not exist
    if (!lektorToUpdate) {
        return res.status(400).json({ message: "Lektor nenalezen" });
    }
    // Looking for a duplicate (except the one being updated)
    const duplicate = yield Lektor.findOne({ username }).lean().exec();
    if (duplicate && (duplicate === null || duplicate === void 0 ? void 0 : duplicate._id.toString()) !== id) {
        return res.status(400).json({
            message: `Lektor s uživatelským jménem: ${username} již existuje`,
        });
    }
    lektorToUpdate.mentor = mentor;
    lektorToUpdate.username = username;
    lektorToUpdate.name = name;
    lektorToUpdate.surname = surname;
    lektorToUpdate.phone_num = phone_num;
    lektorToUpdate.date_of_birth = date_of_birth;
    lektorToUpdate.bank_account = bank_account;
    lektorToUpdate.active = active;
    // Changing password, email, gamil
    if (password) {
        lektorToUpdate.password = yield bcrypt.hash(password, 10);
    }
    if (gmail) {
        lektorToUpdate.gmail = gmail;
    }
    if (email) {
        lektorToUpdate.email = email;
    }
    if (others) {
        lektorToUpdate.others = others;
    }
    const updatedLektor = yield lektorToUpdate.save();
    res.json({ message: `Lektor ${updatedLektor.username} upraven` });
});
exports.updateLektor = updateLektor;
// @desc Delete a lektor
// @route DELETE /lektors
// @access Private
const deleteLektor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    // ID is required
    if (!id) {
        return res.status(400).json({ message: "Je potřeba ID lektora" });
    }
    // No tutorings or salaries are connected to the lektor
    const tutoring = yield Tutoring.findOne({ lektor: id }).lean().exec();
    if (tutoring) {
        return res
            .status(400)
            .json({ message: "K lektorovi jsou vázaná doučování" });
    }
    const salaries = yield Salary.findOne({ lektor: id }).lean().exec();
    if (salaries) {
        return res
            .status(400)
            .json({ message: "K lektorovi jsou vázané výplaty" });
    }
    const lektorToDelete = yield Lektor.findById(id).exec();
    // Does the lektor exist?
    if (!lektorToDelete) {
        return res.status(400).json({ message: "Lektor nenalezen" });
    }
    const result = yield lektorToDelete.deleteOne();
    const reply = `Lektor ${result.username} s ID ${result._id} smazán`;
    res.json(reply);
});
exports.deleteLektor = deleteLektor;
