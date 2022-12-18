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
// @desc Get all lektors
// @route GET /lektors
// @access Private
const getAllLektors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ message: "OK" });
});
exports.getAllLektors = getAllLektors;
// @desc Create new lektor
// @route POST /lektors
// @access Private
const createNewLektor = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.createNewLektor = createNewLektor;
// @desc Update a lektor
// @route PATCH /lektors
// @access Private
const updateLektor = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.updateLektor = updateLektor;
// @desc Delete a lektor
// @route DELETE /lektors
// @access Private
const deleteLektor = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.deleteLektor = deleteLektor;
