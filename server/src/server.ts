const path = require("path");
//Pokud bude dělat problém, tak smaž {*} (problém = nemůže najít .env/dist pokud to spustíš rovnou z dist)
require("dotenv").config({ path: "./dist/.env" });
const express = require("express");
const app = express();
const { logger, logEvents } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");
const PORT: string = process.env.PORT || "3500";
export {};
//Main code:
//console.log(require("dotenv").config());
console.log(process.env.NODE_ENV);

connectDB();

app.use(logger);

//app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "/public")));
// Routing
app.use("/", require("./routes/root"));
app.use("/mentors", require("./routes/mentorRoutes"));
app.use("/lektors", require("./routes/lektorRoutes"));
app.use("/clients", require("./routes/clientRoutes"));
app.use("/tutorings", require("./routes/tutoringRoutes"));
app.use("/lessons", require("./routes/lessonRoutes"));
app.use("/invoices", require("./routes/invoiceRoutes"));
app.use("/salaries", require("./routes/salaryRoutes"));

// Not catched by routing
app.all("*"),
	(req: any, res: any) => {
		res.status(404);
		if (req.accepts("html")) {
			res.sendFile(path.join(__dirname, "views", "404.html"));
		} else if (req.accepts("json")) {
			res.json({ message: "404 Not Found" });
		} else {
			res.type("txt").send("404 Not Found");
		}
	};

app.use(errorHandler);

mongoose.connection.once("open", () => {
	console.log("[server[ Connected to MongoDB");
	app.listen(PORT, () =>
		console.log(`[server] Server running on port ${PORT}`)
	);
});

mongoose.connection.on("error", (err: any) => {
	console.log(err);
	logEvents(
		`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
		"mongoErrLog.log"
	);
});
