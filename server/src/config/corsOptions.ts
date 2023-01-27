const allowedOrigins: string[] = require("./allowedOrigins");

const corsOptions: any = {
	origin: (origin: string, callback: any) => {
		if (allowedOrigins.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	credentials: true,
	optionsSuccessStatus: 200,
};

export = corsOptions;
