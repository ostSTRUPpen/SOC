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
    // Get all lessons from MongoDB
    const lessons = yield Lesson.find().select().lean();
    // No lessons
    if (!lessons.length) {
        return res.status(400).json({ message: "Nenalezena žádná data" });
    }
    res.json(lessons);
});
exports.getAllLessons = getAllLessons;
// @desc Create new lesson
// @route POST /lessons
// @access Private
const createNewLesson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tutoring, lesson_number, date, theme, length, info } = req.body;
    if (!tutoring || !lesson_number || !date || !theme || !length || !info) {
        return res.status(400).json({
            message: "Všechna pole jsou povinná",
        });
    }
    // Duplicates
    if (yield Lesson.findOne({
        lesson_number: lesson_number,
        tutoring: tutoring,
    })
        .lean()
        .exec()) {
        return res.status(400).json({
            message: `Zápis hodiny s tímto číslem, pro toto doučování, již existuje`,
        });
    }
    const lessonObject = {
        tutoring,
        lesson_number,
        date,
        theme,
        length,
        info,
    };
    const lesson = yield Lesson.create(lessonObject);
    if (lesson) {
        res.status(201).json({
            message: `Nový zápis hodiny s datem ${date} zaznamenán`,
        });
    }
    else {
        res.status(400).json({ message: `Došlo k chybě` });
    }
});
exports.createNewLesson = createNewLesson;
// @desc Update a lesson
// @route PATCH /lessons
// @access Private
const updateLesson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, tutoring, lesson_number, date, theme, length, info } = req.body;
    if (!id ||
        !tutoring ||
        !lesson_number ||
        !date ||
        !theme ||
        !length ||
        !info) {
        return res.status(400).json({
            message: "Všechna pole jsou povinná",
        });
    }
    const lessonToUpdate = yield Lesson.findById(id).exec();
    // The lesson does not exist
    if (!lessonToUpdate) {
        return res.status(400).json({ message: "Zápis hodiny nenalezen" });
    }
    const duplicate = yield Lesson.findOne({
        lesson_number: lesson_number,
        tutoring: tutoring,
    })
        .lean()
        .exec();
    if (duplicate && (duplicate === null || duplicate === void 0 ? void 0 : duplicate._id.toString()) !== id) {
        return res.status(400).json({
            message: `Zápis hodiny s tímto číslem, pro toto doučování, již existuje`,
        });
    }
    lessonToUpdate.tutoring = tutoring;
    lessonToUpdate.lesson_number = lesson_number;
    lessonToUpdate.date = date;
    lessonToUpdate.theme = theme;
    lessonToUpdate.length = length;
    lessonToUpdate.info = info;
    const updatedLesson = yield lessonToUpdate.save();
    res.json({
        message: `Zápis hodiny číslo ${updatedLesson.lesson_number} upraven`,
    });
});
exports.updateLesson = updateLesson;
// @desc Delete a lesson
// @route DELETE /lessons
// @access Private
const deleteLesson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ message: "Je potřeba ID hodiny" });
    }
    const lessonToDelete = yield Lesson.findById(id).exec();
    // Does the lesson exist?
    if (!lessonToDelete) {
        return res.status(400).json({ message: "Zápis hodiny nenalezen" });
    }
    const result = yield lessonToDelete.deleteOne();
    const reply = `Zápis hodiny číslo ${result.lesson_number} s ID ${result._id} byl smazán`;
    res.json(reply);
});
exports.deleteLesson = deleteLesson;
