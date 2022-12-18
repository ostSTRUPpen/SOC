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
exports.deleteClient = exports.updateClient = exports.createNewClient = exports.getAllClients = void 0;
const Client = require("../models/Client");
// @desc Get all clients
// @route GET /clients
// @access Private
const getAllClients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ message: "OK" });
});
exports.getAllClients = getAllClients;
// @desc Create new client
// @route POST /clients
// @access Private
const createNewClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.createNewClient = createNewClient;
// @desc Update a client
// @route PATCH /clients
// @access Private
const updateClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.updateClient = updateClient;
// @desc Delete a client
// @route DELETE /clients
// @access Private
const deleteClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.deleteClient = deleteClient;
