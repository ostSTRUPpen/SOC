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
// @desc Get all salaries
// @route GET /salaries
// @access Private
const getAllSalaries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ message: "OK" });
});
exports.getAllSalaries = getAllSalaries;
// @desc Create new salary
// @route POST /salaries
// @access Private
const createNewSalary = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.createNewSalary = createNewSalary;
// @desc Update a salary
// @route PATCH /salaries
// @access Private
const updateSalary = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.updateSalary = updateSalary;
// @desc Delete a salary
// @route DELETE /salaries
// @access Private
const deleteSalary = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.deleteSalary = deleteSalary;
