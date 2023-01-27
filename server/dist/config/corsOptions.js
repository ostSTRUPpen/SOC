"use strict";
const allowedOrigins = require("./allowedOrigins");
const isInDevelopment = process.env.NODE_ENV === "development" ? true : false;
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 ||
            (!origin && isInDevelopment)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
};
module.exports = corsOptions;
