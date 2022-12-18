const Lesson: any = require("../models/Lesson");

// @desc Get all lessons
// @route GET /lessons
// @access Private
const getAllLessons = async (req: any, res: any) => {
	res.json({ message: "OK" });
};

// @desc Create new lesson
// @route POST /lessons
// @access Private
const createNewLesson = async (req: any, res: any) => {};

// @desc Update a lesson
// @route PATCH /lessons
// @access Private
const updateLesson = async (req: any, res: any) => {};

// @desc Delete a lesson
// @route DELETE /lessons
// @access Private
const deleteLesson = async (req: any, res: any) => {};

export { getAllLessons, createNewLesson, updateLesson, deleteLesson };
