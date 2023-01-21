"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const verifyJWT_1 = __importDefault(require("../middleware/verifyJWT"));
const express = require("express");
const router = express.Router();
const tutoringController = require("../controllers/tutoringsController");
router.use(verifyJWT_1.default);
router
    .route("/")
    .get(tutoringController.getAllTutorings)
    .post(tutoringController.createNewTutoring)
    .patch(tutoringController.updateTutoring)
    .delete(tutoringController.deleteTutoring);
module.exports = router;
