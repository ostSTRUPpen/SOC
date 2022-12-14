const express = require("express");
const router = express.Router();
const path = require("path");

router.get("^/$|/index(.html)?", (req: any, res: any) => {
	res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

export = router;
