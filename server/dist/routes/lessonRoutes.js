"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const verifyJWT_1 = __importDefault(require("../middleware/verifyJWT"));
const express = require("express");
const router = express.Router();
const lessonController = require("../controllers/lessonsController");
router.use(verifyJWT_1.default);
router
    .route("/")
    .get(lessonController.getAllLessons)
    .post(lessonController.createNewLesson)
    .patch(lessonController.updateLesson)
    .delete(lessonController.deleteLesson);
module.exports = router;
