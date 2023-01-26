const Salary: any = require("../models/Salary");
const Mentor: any = require("../models/Mentor");
const Lektor: any = require("../models/Lektor");

// @desc Get all salaries
// @route GET /salaries
// @access Private
const getAllSalaries = async (req: any, res: any) => {
	// Get all salaries from MongoDB
	const salaries: any = await Salary.find().select().lean();

	// No salaries
	if (!salaries.length) {
		return res.status(400).json({ message: "Nenalezena žádná data" });
	}

	const salariesWithProperDates = await Promise.all(
		salaries.map(async (salary: any) => {
			return {
				...salary,
				date: `${salary.date.getUTCFullYear()}-${String(
					salary.date.getUTCMonth() + 1
				).padStart(2, "0")}-${String(salary.date.getUTCDate()).padStart(
					2,
					"0"
				)}`,
			};
		})
	);

	res.json(salariesWithProperDates);
};

// @desc Create new salary
// @route POST /salaries
// @access Private
const createNewSalary = async (req: any, res: any) => {
	const { mentor, lektor, value, date, tutoring } = req.body;
	if (!mentor || !lektor || !value || !date || !tutoring) {
		return res.status(400).json({
			message: "Všechna pole jsou povinná",
		});
	}

	const duplicate = await Salary.findOne({
		mentor: mentor,
		lektor: lektor,
		tutoring: tutoring,
		date: date,
		value: value,
	})
		.lean()
		.exec();
	if (duplicate) {
		return res.status(400).json({
			message: `Tato výplata již existuje`,
		});
	}

	const salaryObject = {
		mentor,
		lektor,
		tutoring,
		date,
		value,
	};

	const salary = await Salary.create(salaryObject);
	if (salary) {
		res.status(201).json({
			message: `Nová výplata zaznamenána`,
		});
	} else {
		res.status(400).json({ message: `Došlo k chybě` });
	}
};

// @desc Update a salary
// @route PATCH /salaries
// @access Private
const updateSalary = async (req: any, res: any) => {
	const { id, mentor, lektor, value, date, tutoring } = req.body;
	if (!id || !mentor || !lektor || !value || !date || !tutoring) {
		return res.status(400).json({
			message: "Všechna pole jsou povinná",
		});
	}

	const salaryToUpdate: any = await Salary.findById(id).exec();

	// The salary does not exist
	if (!salaryToUpdate) {
		return res.status(400).json({ message: "Výplata nenalezena" });
	}

	const duplicate = await Salary.findOne({
		mentor: mentor,
		lektor: lektor,
		tutoring: tutoring,
		date: date,
		value: value,
	})
		.lean()
		.exec();
	if (duplicate && duplicate?._id.toString() !== id) {
		return res.status(400).json({
			message: `Tato výplata již existuje`,
		});
	}

	salaryToUpdate.lektor = lektor;
	salaryToUpdate.mentor = mentor;
	salaryToUpdate.tutoring = tutoring;
	salaryToUpdate.value = value;
	salaryToUpdate.date = date;

	const updatedSalary = await salaryToUpdate.save();

	res.json({
		message: `Výplata s datem ${updatedSalary.date} zaznamenána`,
	});
};

// @desc Delete a salary
// @route DELETE /salaries
// @access Private
const deleteSalary = async (req: any, res: any) => {
	const { id } = req.body;

	if (!id) {
		return res.status(400).json({ message: "Je potřeba ID výplaty" });
	}

	const salaryToDelete = await Salary.findById(id).exec();

	// Does the salary exist?
	if (!salaryToDelete) {
		return res.status(400).json({ message: "Výplata nenalezena" });
	}

	const result = await salaryToDelete.deleteOne();

	const reply = `Výplata vymazána`;

	res.json(reply);
};

export { getAllSalaries, createNewSalary, updateSalary, deleteSalary };
