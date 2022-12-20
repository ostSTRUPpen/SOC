"use strict";
const mongoose = require("mongoose");
const lessonSchema = new mongoose.Schema({
    tutoring: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Tutoring",
    },
    lesson_number: {
        type: Number,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    theme: {
        type: String,
        required: true,
    },
    length: {
        type: Number,
        required: true,
        default: 60,
    },
    info: {
        type: String,
        required: true,
    },
});
module.exports = mongoose.model("Lesson", lessonSchema);
