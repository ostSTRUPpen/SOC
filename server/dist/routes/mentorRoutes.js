"use strict";
const express = require("express");
const router = express.Router();
const mentorController = require("../controllers/mentorsController");
router
    .route("/")
    .get(mentorController.getAllMentors)
    .post(mentorController.createNewMentor)
    .patch(mentorController.updateMentor)
    .delete(mentorController.deleteMentor);
module.exports = router;
