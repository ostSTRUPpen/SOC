const Lesson = require("../models/Lesson");
const Tutoring: any = require("../models/Tutoring");
const Lektor: any = require("../models/Lektor");
const Client: any = require("../models/Client");

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

	const tutoring = await Tutoring.create({ lektor, client, subject });

	if (tutoring) {
		const lektorInfo = await Lektor.findById(tutoring.lektor).lean().exec();
		const clientInfo = await Client.findById(tutoring.client).lean().exec();
		return res.status(201).json({
			message: `Doučování mezi ${lektorInfo.name} ${lektorInfo.surname} a ${clientInfo.name_child} ${clientInfo.surname_child} s přemětem: ${subject} vytvořeno`,
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

	const duplicate = await Tutoring.findOne({ id }).lean().exec();
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
		const lektorInfo = await Lektor.findById(tutoringToUpdate.lektor)
			.lean()
			.exec();
		const clientInfo = await Client.findById(tutoringToUpdate.client)
			.lean()
			.exec();
		return res.status(201).json({
			message: `Doučování mezi ${lektorInfo.name} ${lektorInfo.surname} a ${clientInfo.name_child} ${clientInfo.surname_child} s přemětem: ${subject} již existuje`,
		});
	}

	tutoringToUpdate.client = client;
	tutoringToUpdate.lektor = lektor;
	tutoringToUpdate.subject = subject;
	tutoringToUpdate.active = active;

	const updatedTutoring = await tutoringToUpdate.save();

	const lektorUpdated = await Lektor.findById(updatedTutoring.lektor)
		.lean()
		.exec();
	const clientUpdated = await Client.findById(updatedTutoring.client)
		.lean()
		.exec();
	res.json({
		message: `Doučování mezi ${lektorUpdated.name} ${lektorUpdated.surname} a ${clientUpdated.name_child} ${clientUpdated.surname_child} s přemětem: ${subject} bylo upraveno`,
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
	const lektorInfo = await Lektor.findById(result.lektor).lean().exec();
	const clientInfo = await Client.findById(result.client).lean().exec();
	const reply = `Doučování mezi ${lektorInfo.name} ${lektorInfo.surname} a ${clientInfo.name_child} ${clientInfo.surname_child} s přemětem: ${result.subject} vymazáno`;

	res.json(reply);
};

export { getAllTutorings, createNewTutoring, updateTutoring, deleteTutoring };
