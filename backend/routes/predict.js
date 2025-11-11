const express = require("express");
const router = express.Router();
const multer = require("multer");
const { predict } = require("../controllers/predictController");

const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), predict);

module.exports = router;
