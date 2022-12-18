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
// @desc Get all mentors
// @route GET /mentors
// @access Private
const getAllMentors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ message: "OK" });
});
exports.getAllMentors = getAllMentors;
// @desc Create new mentor
// @route POST /mentors
// @access Private
const createNewMentor = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.createNewMentor = createNewMentor;
// @desc Update a mentor
// @route PATCH /mentors
// @access Private
const updateMentor = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.updateMentor = updateMentor;
// @desc Delete a mentor
// @route DELETE /mentors
// @access Private
const deleteMentor = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.deleteMentor = deleteMentor;
