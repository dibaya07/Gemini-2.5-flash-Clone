const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth.js");
const {
  sendMessage,
  getMessage,
  allMessages,
} = require("../controller/chatController");
const multer = require("multer");
// const { storage } = require("../cloudConfig.js");
const upload = multer({ dest: "uploads/" });

router.get("/", verifyToken, getMessage);
router.post("/", verifyToken,upload.single("file"), sendMessage);
router.post("/:id", allMessages);

module.exports = router;
