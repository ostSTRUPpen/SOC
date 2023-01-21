import verifyJWT from "../middleware/verifyJWT";

const express = require("express");
const router = express.Router();
const lektorController = require("../controllers/lektorsController");

router.use(verifyJWT);

router
	.route("/")
	.get(lektorController.getAllLektors)
	.post(verifyJWT, lektorController.createNewLektor)
	.patch(verifyJWT, lektorController.updateLektor)
	.delete(verifyJWT, lektorController.deleteLektor);

export = router;
