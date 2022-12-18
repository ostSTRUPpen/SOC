const express = require("express");
const router = express.Router();
const lektorController = require("../controllers/lektorsController");

router
	.route("/")
	.get(lektorController.getAllLektors)
	.post(lektorController.createNewLektor)
	.patch(lektorController.updateLektor)
	.delete(lektorController.deleteLektor);

export = router;
