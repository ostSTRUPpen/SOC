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
exports.deleteTutoring = exports.updateTutoring = exports.createNewTutoring = exports.getAllTutorings = void 0;
const Tutoring = require("../models/Tutoring");
// @desc Get all tutorings
// @route GET /tutorings
// @access Private
const getAllTutorings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ message: "OK" });
});
exports.getAllTutorings = getAllTutorings;
// @desc Create new tutoring
// @route POST /tutorings
// @access Private
const createNewTutoring = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.createNewTutoring = createNewTutoring;
// @desc Update a tutoring
// @route PATCH /tutorings
// @access Private
const updateTutoring = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.updateTutoring = updateTutoring;
// @desc Delete a tutoring
// @route DELETE /tutorings
// @access Private
const deleteTutoring = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.deleteTutoring = deleteTutoring;
