const Tutoring: any = require("../models/Tutoring");

// @desc Get all tutorings
// @route GET /tutorings
// @access Private
const getAllTutorings = async (req: any, res: any) => {
	res.json({ message: "OK" });
};

// @desc Create new tutoring
// @route POST /tutorings
// @access Private
const createNewTutoring = async (req: any, res: any) => {};

// @desc Update a tutoring
// @route PATCH /tutorings
// @access Private
const updateTutoring = async (req: any, res: any) => {};

// @desc Delete a tutoring
// @route DELETE /tutorings
// @access Private
const deleteTutoring = async (req: any, res: any) => {};

export { getAllTutorings, createNewTutoring, updateTutoring, deleteTutoring };
