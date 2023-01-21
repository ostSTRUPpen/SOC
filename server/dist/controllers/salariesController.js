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
exports.deleteSalary = exports.updateSalary = exports.createNewSalary = exports.getAllSalaries = void 0;
const Salary = require("../models/Salary");
const Mentor = require("../models/Mentor");
const Lektor = require("../models/Lektor");
// @desc Get all salaries
// @route GET /salaries
// @access Private
const getAllSalaries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get all salaries from MongoDB
    const salaries = yield Salary.find().select().lean();
    // No salaries
    if (!salaries.length) {
        return res.status(400).json({ message: "Nenalezena žádná data" });
    }
    res.json(salaries);
});
exports.getAllSalaries = getAllSalaries;
// @desc Create new salary
// @route POST /salaries
// @access Private
const createNewSalary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { mentor, lektor, value, date, tutoring } = req.body;
    if (!mentor || !lektor || !value || !date || !tutoring) {
        return res.status(400).json({
            message: "Všechna pole jsou povinná",
        });
    }
    const duplicate = yield Salary.findOne({
        mentor: mentor,
        lektor: lektor,
        tutoring: tutoring,
        date: date,
        value: value,
    })
        .lean()
        .exec();
    if (duplicate) {
        return res.status(400).json({
            message: `Tato výplata již existuje`,
        });
    }
    const salaryObject = {
        mentor,
        lektor,
        tutoring,
        date,
        value,
    };
    const salary = yield Salary.create(salaryObject);
    if (salary) {
        res.status(201).json({
            message: `Nová výplata zaznamenána`,
        });
    }
    else {
        res.status(400).json({ message: `Došlo k chybě` });
    }
});
exports.createNewSalary = createNewSalary;
// @desc Update a salary
// @route PATCH /salaries
// @access Private
const updateSalary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, mentor, lektor, value, date, tutoring } = req.body;
    if (!id || !mentor || !lektor || !value || !date || !tutoring) {
        return res.status(400).json({
            message: "Všechna pole jsou povinná",
        });
    }
    const salaryToUpdate = yield Salary.findById(id).exec();
    // The salary does not exist
    if (!salaryToUpdate) {
        return res.status(400).json({ message: "Výplata nenalezena" });
    }
    const duplicate = yield Salary.findOne({
        mentor: mentor,
        lektor: lektor,
        tutoring: tutoring,
        date: date,
        value: value,
    })
        .lean()
        .exec();
    if (duplicate && (duplicate === null || duplicate === void 0 ? void 0 : duplicate._id.toString()) !== id) {
        return res.status(400).json({
            message: `Tato výplata již existuje`,
        });
    }
    salaryToUpdate.lektor = lektor;
    salaryToUpdate.mentor = mentor;
    salaryToUpdate.tutoring = tutoring;
    salaryToUpdate.value = value;
    salaryToUpdate.date = date;
    const updatedSalary = yield salaryToUpdate.save();
    res.json({
        message: `Výplata s datem ${updatedSalary.date} zaznamenána`,
    });
});
exports.updateSalary = updateSalary;
// @desc Delete a salary
// @route DELETE /salaries
// @access Private
const deleteSalary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ message: "Je potřeba ID výplaty" });
    }
    const salaryToDelete = yield Salary.findById(id).exec();
    // Does the salary exist?
    if (!salaryToDelete) {
        return res.status(400).json({ message: "Výplata nenalezena" });
    }
    const result = yield salaryToDelete.deleteOne();
    const reply = `Výplata vymazána`;
    res.json(reply);
});
exports.deleteSalary = deleteSalary;
