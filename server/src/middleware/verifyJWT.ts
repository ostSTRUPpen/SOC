const jwt = require("jsonwebtoken");

const verifyJWT = (req: any, res: any, next: any) => {
	const authHeader = req.headers.authorization || req.headers.Authorization;

	if (!authHeader?.startsWith("Bearer ")) {
		return res.status(401).json({ message: "Unauthorized 5" });
	}

	const token = authHeader.split(" ")[1];

	jwt.verify(
		token,
		process.env.ACCESS_TOKEN_SECRET,
		(err: any, decoded: any) => {
			if (err) return res.status(403).json({ message: "Forbidden 1" });
			req.user = decoded.UserInfo.username;
			req.roles = decoded.UserInfo.roles;
			next();
		}
	);
};

export = verifyJWT;
