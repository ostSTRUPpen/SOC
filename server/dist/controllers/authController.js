"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Client_1 = __importDefault(require("../models/Client"));
const Lektor_1 = __importDefault(require("../models/Lektor"));
const Mentor_1 = __importDefault(require("../models/Mentor"));
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// @desc Login
// @route POST /auth
// @access Public
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Prosím vyplňte všechna pole" });
    }
    const foundMentor = yield Mentor_1.default.findOne({ username }).exec();
    const foundLektor = yield Lektor_1.default.findOne({ username }).exec();
    const foundClient = yield Client_1.default.findOne({ username }).exec();
    const foundUser = foundMentor
        ? foundMentor
        : foundLektor
            ? foundLektor
            : foundClient
                ? foundClient
                : undefined;
    if (!foundUser || !foundUser.active) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const match = yield bcrypt.compare(password, foundUser.password);
    if (!match)
        return res.status(401).json({ message: "Unauthorized" });
    const accessToken = jwt.sign({
        UserInfo: {
            username: foundUser.username,
            roles: foundUser.role,
        },
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
    const refreshToken = jwt.sign({ username: foundUser.username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
    // Create secure cookie with refresh token
    res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
    });
    // Send accessToken containing username and roles
    res.json({ accessToken });
});
// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
const refresh = (req, res) => {
    const cookies = req.cookies;
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt))
        return res.status(401).json({ message: "Unauthorized" });
    const refreshToken = cookies.jwt;
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
        if (err)
            return res.status(403).json({ message: "Forbidden" });
        const foundMentor = yield Mentor_1.default.findOne({
            username: decoded.username,
        }).exec();
        const foundLektor = yield Lektor_1.default.findOne({
            username: decoded.username,
        }).exec();
        const foundClient = yield Client_1.default.findOne({
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
            return res.status(401).json({ message: "Unauthorized" });
        const accessToken = jwt.sign({
            UserInfo: {
                username: foundUser.username,
                roles: foundUser.role,
            },
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
        res.json({ accessToken });
    }));
};
// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = (req, res) => {
    const cookies = req.cookies;
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt))
        return res.sendStatus(204); //No content
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    res.json({ message: "Cookie cleared" });
};
module.exports = {
    login,
    refresh,
    logout,
};
