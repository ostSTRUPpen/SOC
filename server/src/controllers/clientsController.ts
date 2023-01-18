const Lektor: any = require("../models/Lektor");
const Mentor: any = require("../models/Mentor");
const Client: any = require("../models/Client");
const Invoice = require("../models/Invoice");
const Tutoring = require("../models/Tutoring");
const bcrypt: any = require("bcrypt");

// @desc Get all clients
// @route GET /clients
// @access Private
const getAllClients = async (req: any, res: any) => {
	// Get all clients from MongoDB
	const clients: any = await Client.find().select("-password").lean();

	// No clients
	if (!clients.length) {
		return res.status(400).json({ message: "Nenalezena žádná data" });
	}
	res.json(clients);
};

// @desc Create new client
// @route POST /clients
// @access Private
const createNewClient = async (req: any, res: any) => {
	const {
		mentor,
		username,
		password,
		name_parent,
		surname_parent,
		name_child,
		surname_child,
		gmail_parent,
		email_parent,
		phone_num_parent,
		gmail_child,
		email_child,
		phone_num_child,
		bank_account,
		date_of_birth_child,
		others,
	} = req.body;

	// Required fields
	if (
		!mentor ||
		!username ||
		!password ||
		!name_parent ||
		!name_child ||
		!surname_parent ||
		!surname_child ||
		!phone_num_parent ||
		!phone_num_child ||
		!email_parent ||
		!date_of_birth_child
	) {
		return res.status(400).json({
			message:
				"Veškerá pole, kromě data narození dítěte, emailu a gmailu na rodiče i děti, jsou povinná",
		});
	}

	// Duplicates

	const foundClient = await Client.findOne({ username }).lean().exec();
	const foundLektor = await Lektor.findOne({ username }).lean().exec();
	const foundMentor = await Mentor.findOne({ username }).lean().exec();

	const duplicate = foundMentor
		? foundMentor
		: foundLektor
		? foundLektor
		: foundClient
		? foundClient
		: undefined;

	if (duplicate) {
		return res.status(400).json({
			message: `TODO`,
		});
	}

	// Password hash
	const hashedPassword: string = await bcrypt.hash(password, 10); //10 salt rounds

	// Creation
	const clientObject = {
		mentor,
		username,
		password: hashedPassword,
		name_parent,
		surname_parent,
		name_child,
		surname_child,
		gmail_parent,
		email_parent,
		phone_num_parent,
		gmail_child,
		email_child,
		phone_num_child,
		bank_account,
		date_of_birth_child,
		others,
	};

	// Saving to database
	const client = await Client.create(clientObject);

	//Output
	if (client) {
		res.status(201).json({ message: `Nový uživatel ${username} vytvořen` });
	} else {
		res.status(400).json({ message: `Došlo k chybě` });
	}
};

// @desc Update a client
// @route PATCH /clients
// @access Private
const updateClient = async (req: any, res: any) => {
	const {
		id,
		mentor,
		username,
		password_old,
		password_new,
		name_parent,
		surname_parent,
		name_child,
		surname_child,
		gmail_parent,
		email_parent,
		phone_num_parent,
		gmail_child,
		email_child,
		phone_num_child,
		bank_account,
		date_of_birth_child,
		others,
		active,
	} = req.body;

	// All fields except password, gmail, email are required
	if (
		!mentor ||
		!username ||
		!name_parent ||
		!name_child ||
		!surname_parent ||
		!surname_child ||
		!phone_num_parent ||
		!phone_num_child ||
		!date_of_birth_child ||
		!email_parent ||
		typeof active !== "boolean"
	) {
		return res.status(400).json({
			message:
				"Veškerá pole, kromě hesla, bankovního účtu a emailu či gmailu na rodiče i děti, jsou povinná" /*+
				` ${[
					id,
					mentor,
					username,
					name_parent,
					surname_parent,
					name_child,
					surname_child,
					phone_num_parent,
					phone_num_child,
					date_of_birth_child,
					typeof active,
				]}`,*/,
		});
	}

	const clientToUpdate: any = await Client.findById(id).exec();

	// The client does not exist
	if (!clientToUpdate) {
		return res.status(400).json({ message: "Klient nenalezen" });
	}

	// Looking for a duplicate (except the one being updated)
	const foundClient = await Client.findOne({ username }).lean().exec();
	const foundLektor = await Lektor.findOne({ username }).lean().exec();
	const foundMentor = await Mentor.findOne({ username }).lean().exec();

	const duplicate = foundMentor
		? foundMentor
		: foundLektor
		? foundLektor
		: foundClient
		? foundClient
		: undefined;
	if (duplicate && duplicate?._id.toString() !== id) {
		return res.status(400).json({
			message: `TODO`,
		});
	}

	clientToUpdate.mentor = mentor;
	clientToUpdate.username = username;
	clientToUpdate.name_parent = name_parent;
	clientToUpdate.surname_parent = surname_parent;
	clientToUpdate.phone_num_parent = phone_num_parent;
	clientToUpdate.name_child = name_child;
	clientToUpdate.surname_child = surname_child;
	clientToUpdate.phone_num_child = phone_num_child;
	clientToUpdate.bank_account = bank_account;
	clientToUpdate.date_of_birth_child = date_of_birth_child;
	clientToUpdate.active = active;
	clientToUpdate.email_parent = email_parent;

	// Changing password, email, gamil
	if (password_old) {
		if (await bcrypt.compare(password_old, clientToUpdate.password)) {
			clientToUpdate.password = await bcrypt.hash(password_new, 10);
		} else {
			return res.status(400).json({
				message: `Zadáno chybné heslo`,
			});
		}
	}
	if (gmail_parent) {
		clientToUpdate.gmail_parent = gmail_parent;
	}
	if (gmail_child) {
		clientToUpdate.gmail_child = gmail_child;
	}
	if (email_child) {
		clientToUpdate.email_child = email_child;
	}
	if (others) {
		clientToUpdate.others = others;
	}

	const updatedClient = await clientToUpdate.save();

	res.json({ message: `${updatedClient.username} upraven` });
};

// @desc Delete a client
// @route DELETE /clients
// @access Private
const deleteClient = async (req: any, res: any) => {
	const { id } = req.body;

	// ID is required
	if (!id) {
		return res.status(400).json({ message: "Je potřeba ID klienta" });
	}

	// No tutorings or invoices are connected to the client
	const tutoring = await Tutoring.findOne({ client: id }).lean().exec();
	if (tutoring) {
		return res
			.status(400)
			.json({ message: "Ke klientovi jsou vázaná doučování" });
	}
	const invoices = await Invoice.findOne({ client: id }).lean().exec();
	if (invoices) {
		return res
			.status(400)
			.json({ message: "Ke klientovi jsou vázané faktury" });
	}

	const clientToDelete = await Client.findById(id).exec();

	// Does the client exist?
	if (!clientToDelete) {
		return res.status(400).json({ message: "Klient nenalezen" });
	}

	const result = await clientToDelete.deleteOne();

	const reply = `Klient ${result.username} s ID ${result._id} smazán`;

	res.json(reply);
};

export { getAllClients, createNewClient, updateClient, deleteClient };
