"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const verifyJWT_1 = __importDefault(require("../middleware/verifyJWT"));
const express = require("express");
const router = express.Router();
const salaryController = require("../controllers/salariesController");
router.use(verifyJWT_1.default);
router
    .route("/")
    .get(salaryController.getAllSalaries)
    .post(salaryController.createNewSalary)
    .patch(salaryController.updateSalary)
    .delete(salaryController.deleteSalary);
module.exports = router;
