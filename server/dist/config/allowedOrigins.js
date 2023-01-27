"use strict";
const allowedOrigins =
	process.env.NODE_ENV === "development"
		? ["http://localhost:3000", "http://localhost:3500", "undefined"]
		: ["https://learning-triangle-soc-version-api.onrender.com/"];
module.exports = allowedOrigins;
