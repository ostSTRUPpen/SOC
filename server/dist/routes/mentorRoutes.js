"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const verifyJWT_1 = __importDefault(require("../middleware/verifyJWT"));
const express = require("express");
const router = express.Router();
const mentorController = require("../controllers/mentorsController");
router.use(verifyJWT_1.default);
router
    .route("/")
    .get(mentorController.getAllMentors)
    .post(mentorController.createNewMentor)
    .patch(mentorController.updateMentor)
    .delete(mentorController.deleteMentor);
module.exports = router;
