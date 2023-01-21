import verifyJWT from "../middleware/verifyJWT";

const express = require("express");
const router = express.Router();
const tutoringController = require("../controllers/tutoringsController");

router.use(verifyJWT);

router
	.route("/")
	.get(tutoringController.getAllTutorings)
	.post(tutoringController.createNewTutoring)
	.patch(tutoringController.updateTutoring)
	.delete(tutoringController.deleteTutoring);

export = router;
