const Lesson = require("../models/Lesson");
const Tutoring: any = require("../models/Tutoring");
const Client: any = require("../models/Client");
const Lektor: any = require("../models/Lektor");

// @desc Get all tutorings
// @route GET /tutorings
// @access Private
const getAllTutorings = async (req: any, res: any) => {
	// Get all tutorings from MongoDB
	const tutorings: any = await Tutoring.find().select().lean();

	// No tutorings
	if (!tutorings.length) {
		return res.status(400).json({ message: "Nenalezena žádná data" });
	}

	res.json(tutorings);
};

// @desc Create new tutoring
// @route POST /tutorings
// @access Private
const createNewTutoring = async (req: any, res: any) => {
	const { client, lektor, subject } = req.body;
	if (!client || !lektor || !subject) {
		return res.status(400).json({
			message: "Všechna pole jsou povinná",
		});
	}
	const clientInfo = await Client.findById(client).lean().exec();
	const lektorInfo = await Lektor.findById(lektor).lean().exec();
	const name = `Lektor: ${lektorInfo.name} ${lektorInfo.surname}, Klient (rodič): ${clientInfo.name_parent} ${clientInfo.surname_parent}`;
	const tutoring = await Tutoring.create({ lektor, client, subject, name });

	if (tutoring) {
		return res.status(201).json({
			message: `Doučování vytvořeno`,
		});
	} else {
		return res.status(400).json({ message: `Došlo k chybě` });
	}
};

// @desc Update a tutoring
// @route PATCH /tutorings
// @access Private
const updateTutoring = async (req: any, res: any) => {
	const { id, client, lektor, subject, active } = req.body;
	if (!id || !client || !lektor || !subject || typeof active !== "boolean") {
		return res.status(400).json({
			message: "Všechna pole jsou povinná",
		});
	}

	const tutoringToUpdate: any = await Tutoring.findById(id).exec();

	if (!tutoringToUpdate) {
		return res.status(400).json({ message: "Doučování nenalezeno" });
	}

	const duplicate = await Tutoring.findOne({ id })
		.collation({ locale: "cs", strength: 2 })
		.lean()
		.exec();
	if (
		(await Tutoring.findOne({
			client: client,
			lektor: lektor,
			subject: subject,
		})
			.lean()
			.exec()) &&
		duplicate?._id.toString() !== id
	) {
		return res.status(201).json({
			message: `Takové doučování již existuje`,
		});
	}

	tutoringToUpdate.client = client;
	tutoringToUpdate.lektor = lektor;
	tutoringToUpdate.subject = subject;
	tutoringToUpdate.active = active;

	const clientInfo = await Client.findById(client).lean().exec();
	const lektorInfo = await Lektor.findById(lektor).lean().exec();
	const name = `Lektor: ${lektorInfo.name} ${lektorInfo.surname}, Klient (rodič): ${clientInfo.name_parent} ${clientInfo.surname_parent}`;
	tutoringToUpdate.name = name;

	const updatedTutoring = await tutoringToUpdate.save();
	res.json({
		message: `Doučování upraveno`,
	});
};

// @desc Delete a tutoring
// @route DELETE /tutorings
// @access Private
const deleteTutoring = async (req: any, res: any) => {
	const { id } = req.body;

	// ID is required
	if (!id) {
		return res.status(400).json({ message: "Je potřeba ID doučování" });
	}

	// No lessons are connected to the tutoring
	const lesson = await Lesson.findOne({ tutoring: id }).lean().exec();
	if (lesson) {
		return res
			.status(400)
			.json({ message: "K doučování jsou vázány zápisy hodin" });
	}

	const tutoringToDelete = await Tutoring.findById(id).exec();

	// Does the tutoring exist?
	if (!tutoringToDelete) {
		return res.status(400).json({ message: "Doučování nenalezeno" });
	}

	const result = await tutoringToDelete.deleteOne();
	const reply = `Doučování mezi vymazáno`;

	res.json(reply);
};

export { getAllTutorings, createNewTutoring, updateTutoring, deleteTutoring };
