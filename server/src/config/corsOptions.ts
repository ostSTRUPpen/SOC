const allowedOrigins: string[] = require("./allowedOrigins");

const isInDevelopment = process.env.NODE_ENV === "development" ? true : false;

const corsOptions: any = {
	origin: (origin: string, callback: any) => {
		if (
			allowedOrigins.indexOf(origin) !== -1 ||
			(!origin && isInDevelopment)
		) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	credentials: true,
	optionsSuccessStatus: 200,
};

export = corsOptions;
