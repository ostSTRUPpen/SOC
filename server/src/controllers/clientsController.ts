const Client: any = require("../models/Client");

// @desc Get all clients
// @route GET /clients
// @access Private
const getAllClients = async (req: any, res: any) => {
	res.json({ message: "OK" });
};

// @desc Create new client
// @route POST /clients
// @access Private
const createNewClient = async (req: any, res: any) => {};

// @desc Update a client
// @route PATCH /clients
// @access Private
const updateClient = async (req: any, res: any) => {};

// @desc Delete a client
// @route DELETE /clients
// @access Private
const deleteClient = async (req: any, res: any) => {};

export { getAllClients, createNewClient, updateClient, deleteClient };
