import verifyJWT from "../middleware/verifyJWT";

const express = require("express");
const router = express.Router();
const lessonController = require("../controllers/lessonsController");

router.use(verifyJWT);

router
	.route("/")
	.get(lessonController.getAllLessons)
	.post(lessonController.createNewLesson)
	.patch(lessonController.updateLesson)
	.delete(lessonController.deleteLesson);

export = router;
