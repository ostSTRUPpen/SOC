const Mentor: any = require("../models/Mentor");
const Salary = require("../models/Salary");
const Lektor = require("../models/Lektor");
const Invoice = require("../models/Invoice");
const Klient = require("../models/Client");
const bcrypt: any = require("bcrypt");

// @desc Get all mentors
// @route GET /mentors
// @access Private
const getAllMentors = async (req: any, res: any) => {
	// Get all mentors from MongoDB
	const mentors: any = await Mentor.find().select("-password").lean();

	// No mentors
	if (!mentors.length) {
		return res.status(400).json({ message: "Nenalezena žádná data" });
	}
	res.json(mentors);
};

// @desc Create new mentor
// @route POST /mentors
// @access Private
const createNewMentor = async (req: any, res: any) => {
	const {
		username,
		password,
		name,
		surname,
		gmail,
		email,
		phone_num,
		bank_account,
		date_of_birth,
		others,
	} = req.body;

	// Required fields
	if (
		!username ||
		!password ||
		!name ||
		!surname ||
		!phone_num ||
		!bank_account
	) {
		return res.status(400).json({
			message:
				"Pole uživatelské jméno, heslo, jméno, příjmení, telefoní číslo a bankovní účet jsou povinná",
		});
	}

	// Duplicates
	if (await Mentor.findOne({ username }).lean().exec()) {
		return res.status(400).json({
			message: `Mentor s uživatelksým jménem: ${username} již existuje`,
		});
	}

	// Password hash
	const hashedPassword: string = await bcrypt.hash(password, 10); //10 salt rounds

	// Creation
	const mentorObject = {
		username,
		password: hashedPassword,
		name,
		surname,
		gmail,
		email,
		phone_num,
		bank_account,
		date_of_birth,
		others,
	};

	// Saving to database
	const mentor = await Mentor.create(mentorObject);

	//Output
	if (mentor) {
		res.status(201).json({ message: `Nový mentor ${username} vytvořen` });
	} else {
		res.status(400).json({ message: `Došlo k chybě` });
	}
};

// @desc Update a mentor
// @route PATCH /mentors
// @access Private
const updateMentor = async (req: any, res: any) => {
	const {
		id,
		username,
		password,
		name,
		surname,
		gmail,
		email,
		phone_num,
		bank_account,
		date_of_birth,
		others,
		active,
	} = req.body;

	// All fields except password, gmail, email are required
	if (
		!id ||
		!username ||
		!name ||
		!surname ||
		!phone_num ||
		typeof active !== "boolean" ||
		!bank_account
	) {
		res.status(400).json({
			message:
				"Všechna pole, kromě hesla, gmailu, emailu a data narození, jsou povinná",
		});
	}

	const mentorToUpdate: any = await Mentor.findById(id).exec();

	// The mentor does not exist
	if (!mentorToUpdate) {
		return res.status(400).json({ message: "Mentor nenalezen" });
	}

	// Looking for a duplicate (except the one being updated)
	const duplicate = await Mentor.findOne({ username }).lean().exec();
	if (duplicate && duplicate?._id.toString() !== id) {
		return res.status(400).json({
			message: `Mentor s uživatelským jménem: ${username} již existuje`,
		});
	}

	mentorToUpdate.username = username;
	mentorToUpdate.name = name;
	mentorToUpdate.surname = surname;
	mentorToUpdate.phone_num = phone_num;
	mentorToUpdate.bank_account = bank_account;
	mentorToUpdate.active = active;

	// Changing password, email, gamil
	if (password) {
		mentorToUpdate.password = await bcrypt.hash(password, 10);
	}
	if (gmail) {
		mentorToUpdate.gmail = gmail;
	}
	if (email) {
		mentorToUpdate.email = email;
	}
	if (date_of_birth) {
		mentorToUpdate.date_of_birth = date_of_birth;
	}
	if (others) {
		mentorToUpdate.others = others;
	}

	const updatedMentor = await mentorToUpdate.save();

	res.json({ message: `${updatedMentor.username} upraven` });
};

// @desc Delete a mentor
// @route DELETE /mentors
// @access Private
const deleteMentor = async (req: any, res: any) => {
	const { id } = req.body;

	// ID is required
	if (!id) {
		return res.status(400).json({ message: "Je potřeba ID mentora" });
	}

	const salaries = await Salary.findOne({ mentor: id }).lean().exec();
	if (salaries) {
		return res
			.status(400)
			.json({ message: "K mentorovi jsou vázané výplaty" });
	}
	const invoices = await Invoice.findOne({ mentor: id }).lean().exec();
	if (invoices) {
		return res
			.status(400)
			.json({ message: "K mentorovi jsou vázané faktury" });
	}
	const lektors = await Lektor.findOne({ mentor: id }).lean().exec();
	if (lektors) {
		return res
			.status(400)
			.json({ message: "K mentorovi jsou vázaní lektoři" });
	}
	const klients = await Klient.findOne({ mentor: id }).lean().exec();
	if (klients) {
		return res
			.status(400)
			.json({ message: "K mentorovi jsou vázaní klienti" });
	}

	const mentorToDelete = await Mentor.findById(id).exec();

	// Does the mentor exist?
	if (!mentorToDelete) {
		return res.status(400).json({ message: "Mentor nenalezen" });
	}

	const result = await mentorToDelete.deleteOne();

	const reply = `Mentor ${result.username} s ID ${result._id} smazán`;

	res.json(reply);
};

export { getAllMentors, createNewMentor, updateMentor, deleteMentor };
