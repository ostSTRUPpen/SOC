const express = require("express");
const router = express.Router();
const salaryController = require("../controllers/salariesController");

router
	.route("/")
	.get(salaryController.getAllSalaries)
	.post(salaryController.createNewSalary)
	.patch(salaryController.updateSalary)
	.delete(salaryController.deleteSalary);

export = router;
