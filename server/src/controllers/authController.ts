import Client from "../models/Client";
import Lektor from "../models/Lektor";
import Mentor from "../models/Mentor";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// @desc Login
// @route POST /auth
// @access Public
const login = async (req: any, res: any) => {
	const { username, password } = req.body;

	if (!username || !password) {
		return res.status(400).json({ message: "Prosím vyplňte všechna pole" });
	}

	const foundMentor = await Mentor.findOne({ username }).exec();
	const foundLektor = await Lektor.findOne({ username }).exec();
	const foundClient = await Client.findOne({ username }).exec();
	const foundUser = foundMentor
		? foundMentor
		: foundLektor
		? foundLektor
		: foundClient
		? foundClient
		: undefined;

	if (!foundUser || !foundUser.active) {
		return res.status(401).json({ message: "Unauthorized 1" });
	}

	const match = await bcrypt.compare(password, foundUser.password);

	if (!match) return res.status(401).json({ message: "Unauthorized 2" });

	const accessToken = jwt.sign(
		{
			UserInfo: {
				id: foundUser.id,
				name: foundUser.name ? foundUser.name : foundUser.name_parent,
				surname: foundUser.surname
					? foundUser.surname
					: foundUser.surname_parent,
				role: foundUser.role,
			},
		},
		process.env.ACCESS_TOKEN_SECRET,
		{ expiresIn: "15m" }
	);

	const refreshToken = jwt.sign(
		{ username: foundUser.username },
		process.env.REFRESH_TOKEN_SECRET,
		{ expiresIn: "28d" }
	);
	// Create secure cookie with refresh token
	res.cookie("jwt", refreshToken, {
		httpOnly: true, //accessible only by web server
		secure: true, //https
		sameSite: "None", //cross-site cookie
		maxAge: 4 * 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
	});
	// Send accessToken containing username and roles
	res.json({ accessToken });
};

// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
const refresh = (req: any, res: any) => {
	const cookies = req.cookies;
	console.log(cookies);
	console.log(process.env.ACCESS_TOKEN_SECRET);
	console.log(process.env.REFRESH_TOKEN_SECRET);

	if (!cookies?.jwt)
		return res.status(401).json({ message: "Unauthorized 3" });

	const refreshToken = cookies.jwt;

	jwt.verify(
		refreshToken,
		process.env.REFRESH_TOKEN_SECRET,
		async (err: any, decoded: any) => {
			if (err) return res.status(403).json({ message: "Forbidden 2" });

			const foundMentor = await Mentor.findOne({
				username: decoded.username,
			}).exec();
			const foundLektor = await Lektor.findOne({
				username: decoded.username,
			}).exec();
			const foundClient = await Client.findOne({
				username: decoded.username,
			}).exec();
			const foundUser = foundMentor
				? foundMentor
				: foundLektor
				? foundLektor
				: foundClient
				? foundClient
				: undefined;

			if (!foundUser)
				return res.status(401).json({ message: "Unauthorized 4" });

			const accessToken = jwt.sign(
				{
					UserInfo: {
						id: foundUser.id,
						name: foundUser.name
							? foundUser.name
							: foundUser.name_parent,
						surname: foundUser.surname
							? foundUser.surname
							: foundUser.surname_parent,
						role: foundUser.role,
					},
				},
				process.env.ACCESS_TOKEN_SECRET,
				{ expiresIn: "15m" }
			);

			res.json({ accessToken });
		}
	);
};

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = (req: any, res: any) => {
	const cookies = req.cookies;
	if (!cookies?.jwt) return res.sendStatus(204); //No content
	res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
	res.json({ message: "Cookie cleared", status: 200 });
};

module.exports = {
	login,
	refresh,
	logout,
};
