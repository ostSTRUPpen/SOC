const Lesson: any = require("../models/Lesson");

// @desc Get all lessons
// @route GET /lessons
// @access Private
const getAllLessons = async (req: any, res: any) => {
	// Get all lessons from MongoDB
	const lessons: any = await Lesson.find().select().lean();

	// No lessons
	if (!lessons.length) {
		return res.status(400).json({ message: "Nenalezena žádná data" });
	}
	res.json(lessons);
};

// @desc Create new lesson
// @route POST /lessons
// @access Private
const createNewLesson = async (req: any, res: any) => {
	const { tutoring, lesson_number, date, theme, length, info } = req.body;

	if (!tutoring || !lesson_number || !date || !theme || !length || !info) {
		return res.status(400).json({
			message: "Všechna pole jsou povinná",
		});
	}

	// Duplicates
	if (
		await Lesson.findOne({
			lesson_number: lesson_number,
			tutoring: tutoring,
		})
			.collation({ locale: "cs", strength: 2 })
			.lean()
			.exec()
	) {
		return res.status(400).json({
			message: `Zápis hodiny s tímto číslem, pro toto doučování, již existuje`,
		});
	}

	const lessonObject = {
		tutoring,
		lesson_number,
		date,
		theme,
		length,
		info,
	};

	const lesson = await Lesson.create(lessonObject);
	if (lesson) {
		res.status(201).json({
			message: `Nový zápis hodiny s datem ${date} zaznamenán`,
		});
	} else {
		res.status(400).json({ message: `Došlo k chybě` });
	}
};

// @desc Update a lesson
// @route PATCH /lessons
// @access Private
const updateLesson = async (req: any, res: any) => {
	const { id, tutoring, lesson_number, date, theme, length, info } = req.body;

	if (
		!id ||
		!tutoring ||
		!lesson_number ||
		!date ||
		!theme ||
		!length ||
		!info
	) {
		return res.status(400).json({
			message: "Všechna pole jsou povinná",
		});
	}

	const lessonToUpdate: any = await Lesson.findById(id).exec();

	// The lesson does not exist
	if (!lessonToUpdate) {
		return res.status(400).json({ message: "Zápis hodiny nenalezen" });
	}

	const duplicate = await Lesson.findOne({
		lesson_number: lesson_number,
		tutoring: tutoring,
	})
		.lean()
		.exec();
	if (duplicate && duplicate?._id.toString() !== id) {
		return res.status(400).json({
			message: `Zápis hodiny s tímto číslem, pro toto doučování, již existuje`,
		});
	}

	lessonToUpdate.tutoring = tutoring;
	lessonToUpdate.lesson_number = lesson_number;
	lessonToUpdate.date = date;
	lessonToUpdate.theme = theme;
	lessonToUpdate.length = length;
	lessonToUpdate.info = info;

	const updatedLesson = await lessonToUpdate.save();

	res.json({
		message: `Zápis hodiny číslo ${updatedLesson.lesson_number} upraven`,
	});
};

// @desc Delete a lesson
// @route DELETE /lessons
// @access Private
const deleteLesson = async (req: any, res: any) => {
	const { id } = req.body;

	if (!id) {
		return res.status(400).json({ message: "Je potřeba ID hodiny" });
	}

	const lessonToDelete = await Lesson.findById(id).exec();

	// Does the lesson exist?
	if (!lessonToDelete) {
		return res.status(400).json({ message: "Zápis hodiny nenalezen" });
	}

	const result = await lessonToDelete.deleteOne();

	const reply = `Zápis hodiny číslo ${result.lesson_number} s ID ${result._id} byl smazán`;

	res.json(reply);
};

export { getAllLessons, createNewLesson, updateLesson, deleteLesson };
