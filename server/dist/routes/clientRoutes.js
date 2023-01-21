"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const verifyJWT_1 = __importDefault(require("../middleware/verifyJWT"));
const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientsController");
router.use(verifyJWT_1.default);
router
    .route("/")
    .get(clientController.getAllClients)
    .post(clientController.createNewClient)
    .patch(clientController.updateClient)
    .delete(clientController.deleteClient);
module.exports = router;
