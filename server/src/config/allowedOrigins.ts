const allowedOrigins: string[] =
	process.env.NODE_ENV === "development"
		? ["http://localhost:3000", "http://localhost:3500", "undefined"]
		: ["https://learning-triangle-is-soc.onrender.com"];
export = allowedOrigins;
