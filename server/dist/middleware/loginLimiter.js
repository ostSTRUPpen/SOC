"use strict";
const rateLimit = require("express-rate-limit");
const { logEvents } = require("./logger");
const loginLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 5,
    message: {
        message: "Příliš pokusů u přihlášení z této IP adresy. Zablokováno na 60 sekund.",
    },
    handler: (req, res, next, options) => {
        logEvents(`Too Many Requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, "errLog.log");
        res.status(options.statusCode).send(options.message);
    },
    standardHeaders: true,
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
module.exports = loginLimiter;
