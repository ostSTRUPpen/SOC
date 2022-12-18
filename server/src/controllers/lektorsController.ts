const Lektor: any = require("../models/Lektor");

// @desc Get all lektors
// @route GET /lektors
// @access Private
const getAllLektors = async (req: any, res: any) => {
	res.json({ message: "OK" });
};

// @desc Create new lektor
// @route POST /lektors
// @access Private
const createNewLektor = async (req: any, res: any) => {};

// @desc Update a lektor
// @route PATCH /lektors
// @access Private
const updateLektor = async (req: any, res: any) => {};

// @desc Delete a lektor
// @route DELETE /lektors
// @access Private
const deleteLektor = async (req: any, res: any) => {};

export { getAllLektors, createNewLektor, updateLektor, deleteLektor };
