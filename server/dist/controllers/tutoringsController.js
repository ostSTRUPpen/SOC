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
const Lesson = require("../models/Lesson");
const Tutoring = require("../models/Tutoring");
const Client = require("../models/Client");
const Lektor = require("../models/Lektor");
// @desc Get all tutorings
// @route GET /tutorings
// @access Private
const getAllTutorings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get all tutorings from MongoDB
    const tutorings = yield Tutoring.find().select().lean();
    // No tutorings
    if (!tutorings.length) {
        return res.status(400).json({ message: "Nenalezena žádná data" });
    }
    res.json(tutorings);
});
exports.getAllTutorings = getAllTutorings;
// @desc Create new tutoring
// @route POST /tutorings
// @access Private
const createNewTutoring = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { client, lektor, subject } = req.body;
    if (!client || !lektor || !subject) {
        return res.status(400).json({
            message: "Všechna pole jsou povinná",
        });
    }
    const clientInfo = yield Client.findById(client).lean().exec();
    const lektorInfo = yield Lektor.findById(lektor).lean().exec();
    const name = `Lektor: ${lektorInfo.name} ${lektorInfo.surname}, Klient (rodič): ${clientInfo.name_parent} ${clientInfo.surname_parent}`;
    const tutoring = yield Tutoring.create({ lektor, client, subject, name });
    if (tutoring) {
        return res.status(201).json({
            message: `Doučování vytvořeno`,
        });
    }
    else {
        return res.status(400).json({ message: `Došlo k chybě` });
    }
});
exports.createNewTutoring = createNewTutoring;
// @desc Update a tutoring
// @route PATCH /tutorings
// @access Private
const updateTutoring = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, client, lektor, subject, active } = req.body;
    if (!id || !client || !lektor || !subject || typeof active !== "boolean") {
        return res.status(400).json({
            message: "Všechna pole jsou povinná",
        });
    }
    const tutoringToUpdate = yield Tutoring.findById(id).exec();
    if (!tutoringToUpdate) {
        return res.status(400).json({ message: "Doučování nenalezeno" });
    }
    const duplicate = yield Tutoring.findOne({ id })
        .collation({ locale: "cs", strength: 2 })
        .lean()
        .exec();
    if ((yield Tutoring.findOne({
        client: client,
        lektor: lektor,
        subject: subject,
    })
        .lean()
        .exec()) &&
        (duplicate === null || duplicate === void 0 ? void 0 : duplicate._id.toString()) !== id) {
        return res.status(201).json({
            message: `Takové doučování již existuje`,
        });
    }
    tutoringToUpdate.client = client;
    tutoringToUpdate.lektor = lektor;
    tutoringToUpdate.subject = subject;
    tutoringToUpdate.active = active;
    const clientInfo = yield Client.findById(client).lean().exec();
    const lektorInfo = yield Lektor.findById(lektor).lean().exec();
    const name = `Lektor: ${lektorInfo.name} ${lektorInfo.surname}, Klient (rodič): ${clientInfo.name_parent} ${clientInfo.surname_parent}`;
    tutoringToUpdate.name = name;
    const updatedTutoring = yield tutoringToUpdate.save();
    res.json({
        message: `Doučování upraveno`,
    });
});
exports.updateTutoring = updateTutoring;
// @desc Delete a tutoring
// @route DELETE /tutorings
// @access Private
const deleteTutoring = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    // ID is required
    if (!id) {
        return res.status(400).json({ message: "Je potřeba ID doučování" });
    }
    // No lessons are connected to the tutoring
    const lesson = yield Lesson.findOne({ tutoring: id }).lean().exec();
    if (lesson) {
        return res
            .status(400)
            .json({ message: "K doučování jsou vázány zápisy hodin" });
    }
    const tutoringToDelete = yield Tutoring.findById(id).exec();
    // Does the tutoring exist?
    if (!tutoringToDelete) {
        return res.status(400).json({ message: "Doučování nenalezeno" });
    }
    const result = yield tutoringToDelete.deleteOne();
    const reply = `Doučování mezi vymazáno`;
    res.json(reply);
});
exports.deleteTutoring = deleteTutoring;
