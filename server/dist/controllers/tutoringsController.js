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
const Lektor = require("../models/Lektor");
const Client = require("../models/Client");
// @desc Get all tutorings
// @route GET /tutorings
// @access Private
const getAllTutorings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get all tutorings from MongoDB
    const tutorings = yield Tutoring.find().select().lean();
    // No tutorings
    if (!tutorings.length) {
        return res.status(400).json({ message: "No tutorings found" });
    }
    const tutoringsWithNames = yield Promise.all(tutorings.map((tutoring) => __awaiter(void 0, void 0, void 0, function* () {
        const lektor = yield Lektor.findById(tutoring.lektor).lean().exec();
        const client = yield Client.findById(tutoring.client).lean().exec();
        return Object.assign(Object.assign({}, tutoring), { lektor: `${lektor.name} ${lektor.surname}`, client: `${client.name_child} ${client.surname_child}` });
    })));
    res.json(tutoringsWithNames);
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
    const tutoring = yield Tutoring.create({ lektor, client, subject });
    if (tutoring) {
        const lektorInfo = yield Lektor.findById(tutoring.lektor).lean().exec();
        const clientInfo = yield Client.findById(tutoring.client).lean().exec();
        return res.status(201).json({
            message: `Doučování mezi ${lektorInfo.name} ${lektorInfo.surname} a ${clientInfo.name_child} ${clientInfo.surname_child} s přemětem: ${subject} vytvořeno`,
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
    const duplicate = yield Tutoring.findOne({ id }).lean().exec();
    if ((yield Tutoring.findOne({
        client: client,
        lektor: lektor,
        subject: subject,
    })
        .lean()
        .exec()) &&
        (duplicate === null || duplicate === void 0 ? void 0 : duplicate._id.toString()) !== id) {
        const lektorInfo = yield Lektor.findById(tutoringToUpdate.lektor)
            .lean()
            .exec();
        const clientInfo = yield Client.findById(tutoringToUpdate.client)
            .lean()
            .exec();
        return res.status(201).json({
            message: `Doučování mezi ${lektorInfo.name} ${lektorInfo.surname} a ${clientInfo.name_child} ${clientInfo.surname_child} s přemětem: ${subject} již existuje`,
        });
    }
    tutoringToUpdate.client = client;
    tutoringToUpdate.lektor = lektor;
    tutoringToUpdate.subject = subject;
    tutoringToUpdate.active = active;
    const updatedTutoring = yield tutoringToUpdate.save();
    const lektorUpdated = yield Lektor.findById(updatedTutoring.lektor)
        .lean()
        .exec();
    const clientUpdated = yield Client.findById(updatedTutoring.client)
        .lean()
        .exec();
    res.json({
        message: `Doučování mezi ${lektorUpdated.name} ${lektorUpdated.surname} a ${clientUpdated.name_child} ${clientUpdated.surname_child} s přemětem: ${subject} bylo upraveno`,
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
    const lektorInfo = yield Lektor.findById(result.lektor).lean().exec();
    const clientInfo = yield Client.findById(result.client).lean().exec();
    const reply = `Doučování mezi ${lektorInfo.name} ${lektorInfo.surname} a ${clientInfo.name_child} ${clientInfo.surname_child} s přemětem: ${result.subject} vymazáno`;
    res.json(reply);
});
exports.deleteTutoring = deleteTutoring;
