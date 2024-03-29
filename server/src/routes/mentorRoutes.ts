import verifyJWT from "../middleware/verifyJWT";

const express = require("express");
const router = express.Router();
const mentorController = require("../controllers/mentorsController");

router.use(verifyJWT);

router
	.route("/")
	.get(mentorController.getAllMentors)
	.post(mentorController.createNewMentor)
	.patch(mentorController.updateMentor)
	.delete(mentorController.deleteMentor);

export = router;
