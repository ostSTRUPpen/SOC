"use strict";
const mongoose = require("mongoose");
const clientSchema = new mongoose.Schema({
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
    name_parent: {
        type: String,
        required: true,
    },
    surname_parent: {
        type: String,
        required: true,
    },
    name_child: {
        type: String,
        required: true,
    },
    surname_child: {
        type: String,
        required: true,
    },
    gmail_parent: {
        type: String,
    },
    email_parent: {
        type: String,
    },
    gmail_child: {
        type: String,
    },
    email_child: {
        type: String,
    },
    phone_num_parent: {
        type: String,
        required: true,
    },
    phone_num_child: {
        type: String,
        required: true,
    },
    bank_account: {
        type: String,
    },
    date_of_birth_child: {
        type: String,
    },
    others: {
        type: Array,
        default: [],
    },
    active: {
        type: Boolean,
        default: true,
    },
    role: {
        type: String,
        default: "client",
    },
});
module.exports = mongoose.model("Client", clientSchema);
