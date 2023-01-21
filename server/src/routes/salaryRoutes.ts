import verifyJWT from "../middleware/verifyJWT";

const express = require("express");
const router = express.Router();
const salaryController = require("../controllers/salariesController");

router.use(verifyJWT);

router
	.route("/")
	.get(salaryController.getAllSalaries)
	.post(salaryController.createNewSalary)
	.patch(salaryController.updateSalary)
	.delete(salaryController.deleteSalary);

export = router;
