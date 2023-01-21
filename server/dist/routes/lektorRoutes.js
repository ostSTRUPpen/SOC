"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const verifyJWT_1 = __importDefault(require("../middleware/verifyJWT"));
const express = require("express");
const router = express.Router();
const lektorController = require("../controllers/lektorsController");
router.use(verifyJWT_1.default);
router
    .route("/")
    .get(lektorController.getAllLektors)
    .post(verifyJWT_1.default, lektorController.createNewLektor)
    .patch(verifyJWT_1.default, lektorController.updateLektor)
    .delete(verifyJWT_1.default, lektorController.deleteLektor);
module.exports = router;
