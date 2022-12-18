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
exports.deleteLesson = exports.updateLesson = exports.createNewLesson = exports.getAllLessons = void 0;
const Lesson = require("../models/Lesson");
// @desc Get all lessons
// @route GET /lessons
// @access Private
const getAllLessons = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ message: "OK" });
});
exports.getAllLessons = getAllLessons;
// @desc Create new lesson
// @route POST /lessons
// @access Private
const createNewLesson = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.createNewLesson = createNewLesson;
// @desc Update a lesson
// @route PATCH /lessons
// @access Private
const updateLesson = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.updateLesson = updateLesson;
// @desc Delete a lesson
// @route DELETE /lessons
// @access Private
const deleteLesson = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.deleteLesson = deleteLesson;
