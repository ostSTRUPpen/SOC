const express = require("express");
const router = express.Router();
const lessonController = require("../controllers/lessonsController");

router
	.route("/")
	.get(lessonController.getAllLessons)
	.post(lessonController.createNewLesson)
	.patch(lessonController.updateLesson)
	.delete(lessonController.deleteLesson);

export = router;