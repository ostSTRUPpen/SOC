"use strict";
const mongoose = require("mongoose");
const lektorSchema = new mongoose.Schema({
    mentor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Mentor",
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    gmail: {
        type: String,
    },
    email: {
        type: String,
    },
    phone_num: {
        type: String,
        required: true,
    },
    bank_account: {
        type: String,
        required: true,
    },
    date_of_birth: {
        type: Date,
        required: true,
    },
    others: {
        type: Object,
        default: {},
    },
    active: {
        type: Boolean,
        default: true,
    },
    role: {
        type: String,
        default: "lektor",
    },
});
module.exports = mongoose.model("Lektor", lektorSchema);
