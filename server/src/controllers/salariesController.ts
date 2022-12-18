const Salary: any = require("../models/Salary");

// @desc Get all salaries
// @route GET /salaries
// @access Private
const getAllSalaries = async (req: any, res: any) => {
	res.json({ message: "OK" });
};

// @desc Create new salary
// @route POST /salaries
// @access Private
const createNewSalary = async (req: any, res: any) => {};

// @desc Update a salary
// @route PATCH /salaries
// @access Private
const updateSalary = async (req: any, res: any) => {};

// @desc Delete a salary
// @route DELETE /salaries
// @access Private
const deleteSalary = async (req: any, res: any) => {};

export { getAllSalaries, createNewSalary, updateSalary, deleteSalary };
