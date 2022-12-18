const Mentor: any = require("../models/Mentor");

// @desc Get all mentors
// @route GET /mentors
// @access Private
const getAllMentors = async (req: any, res: any) => {
	res.json({ message: "OK" });
};

// @desc Create new mentor
// @route POST /mentors
// @access Private
const createNewMentor = async (req: any, res: any) => {};

// @desc Update a mentor
// @route PATCH /mentors
// @access Private
const updateMentor = async (req: any, res: any) => {};

// @desc Delete a mentor
// @route DELETE /mentors
// @access Private
const deleteMentor = async (req: any, res: any) => {};

export { getAllMentors, createNewMentor, updateMentor, deleteMentor };
