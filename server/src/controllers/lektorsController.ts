const Mentor: any = require("../models/Mentor");
const Client: any = require("../models/Client");
const Lektor: any = require("../models/Lektor");
const Salary = require("../models/Salary");
const Tutoring = require("../models/Tutoring");
const bcrypt: any = require("bcrypt");

// @desc Get all lektors
// @route GET /lektors
// @access Private
const getAllLektors = async (req: any, res: any) => {
	// Get all lektors from MongoDB
	const lektors: any = await Lektor.find().select("-password").lean();

	// No lektors
	if (!lektors.length) {
		return res.status(400).json({ message: "Nenalezena žádná data" });
	}
	res.json(lektors);
};

// @desc Create new lektor
// @route POST /lektors
// @access Private
const createNewLektor = async (req: any, res: any) => {
	const {
		mentor,
		username,
		password,
		name,
		surname,
		gmail,
		email,
		phone_num,
		date_of_birth,
		bank_account,
		others,
	} = req.body;

	// Required fields
	if (
		!mentor ||
		!username ||
		!password ||
		!name ||
		!surname ||
		!phone_num ||
		!date_of_birth ||
		!email ||
		!bank_account
	) {
		return res.status(400).json({
			message:
				"Pole zodpovídající lektor, uživatelské jméno, heslo, jméno, příjmení, bankovní účet, datum narození a telefoní číslo jsou povinná",
		});
	}

	// Duplicates
	const foundClient = await Client.findOne({ username }).lean().exec();
	const foundLektor = await Lektor.findOne({ username }).lean().exec();
	const foundMentor = await Mentor.findOne({ username }).lean().exec();

	const duplicate = foundMentor
		? foundMentor
		: foundClient
		? foundClient
		: foundLektor
		? foundLektor
		: undefined;
	if (duplicate) {
		return res.status(400).json({
			message: `Lektor s uživatelksým jménem: ${username} již existuje`,
		});
	}

	// Password hash
	const hashedPassword: string = await bcrypt.hash(password, 10); //10 salt rounds

	// Creation
	const lektorObject = {
		mentor,
		username,
		password: hashedPassword,
		name,
		surname,
		gmail,
		email,
		phone_num,
		date_of_birth,
		bank_account,
		others,
	};

	// Saving to database
	const lektor = await Lektor.create(lektorObject);

	//Output
	if (lektor) {
		res.status(201).json({ message: `Nový lektor ${username} vytvořen` });
	} else {
		res.status(400).json({ message: `Došlo k chybě` });
	}
};

// @desc Update a lektor
// @route PATCH /lektors
// @access Private
const updateLektor = async (req: any, res: any) => {
	const {
		id,
		mentor,
		username,
		password_old,
		password_new,
		name,
		surname,
		gmail,
		email,
		phone_num,
		date_of_birth,
		bank_account,
		others,
		active,
	} = req.body;

	// All fields except password, gmail, email are required
	if (
		!id ||
		!mentor ||
		!username ||
		!name ||
		!surname ||
		!phone_num ||
		!email ||
		typeof active !== "boolean" ||
		!date_of_birth ||
		!bank_account
	) {
		return res.status(400).json({
			message: `Pole zodpovídající mentor, uživatelské jméno, jméno, příjmení, bankovní účet, datum narození, telefoní číslo a aktivní jsou povinná`,
		});
	}

	const lektorToUpdate: any = await Lektor.findById(id).exec();

	// The lektor does not exist
	if (!lektorToUpdate) {
		return res.status(400).json({ message: "Lektor nenalezen" });
	}

	// Looking for a duplicate (except the one being updated)

	const foundClient = await Client.findOne({ username }).lean().exec();
	const foundLektor = await Lektor.findOne({ username }).lean().exec();
	const foundMentor = await Mentor.findOne({ username }).lean().exec();

	const duplicate = foundMentor
		? foundMentor
		: foundClient
		? foundClient
		: foundLektor
		? foundLektor
		: undefined;

	if (duplicate && duplicate?._id.toString() !== id) {
		return res.status(400).json({
			message: `Lektor s uživatelským jménem: ${username} již existuje`,
		});
	}

	lektorToUpdate.mentor = mentor;
	lektorToUpdate.username = username;
	lektorToUpdate.name = name;
	lektorToUpdate.surname = surname;
	lektorToUpdate.phone_num = phone_num;
	lektorToUpdate.date_of_birth = date_of_birth;
	lektorToUpdate.bank_account = bank_account;
	lektorToUpdate.email = email;
	lektorToUpdate.active = active;

	// Changing password, email, gamil
	if (password_old) {
		if (await bcrypt.compare(password_old, lektorToUpdate.password)) {
			lektorToUpdate.password = await bcrypt.hash(password_new, 10);
		} else {
			return res.status(400).json({
				message: `Zadáno chybné heslo`,
			});
		}
	}
	if (gmail) {
		lektorToUpdate.gmail = gmail;
	}
	if (others) {
		lektorToUpdate.others = others;
	}

	const updatedLektor = await lektorToUpdate.save();

	res.json({ message: `Lektor ${updatedLektor.username} upraven` });
};

// @desc Delete a lektor
// @route DELETE /lektors
// @access Private
const deleteLektor = async (req: any, res: any) => {
	const { id } = req.body;

	// ID is required
	if (!id) {
		return res.status(400).json({ message: "Je potřeba ID lektora" });
	}

	// No tutorings or salaries are connected to the lektor
	const tutoring = await Tutoring.findOne({ lektor: id }).lean().exec();
	if (tutoring) {
		return res
			.status(400)
			.json({ message: "K lektorovi jsou vázaná doučování" });
	}
	const salaries = await Salary.findOne({ lektor: id }).lean().exec();
	if (salaries) {
		return res
			.status(400)
			.json({ message: "K lektorovi jsou vázané výplaty" });
	}

	const lektorToDelete = await Lektor.findById(id).exec();

	// Does the lektor exist?
	if (!lektorToDelete) {
		return res.status(400).json({ message: "Lektor nenalezen" });
	}

	const result = await lektorToDelete.deleteOne();

	const reply = `Lektor ${result.username} s ID ${result._id} smazán`;

	res.json(reply);
};

export { getAllLektors, createNewLektor, updateLektor, deleteLektor };
