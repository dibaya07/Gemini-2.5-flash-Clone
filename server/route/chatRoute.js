const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth.js");
const {
  sendMessage,
  getMessage,
  allMessages,
} = require("../controller/chatController");

router.get("/", verifyToken, getMessage);
router.post("/", verifyToken, sendMessage);
router.post("/:id", allMessages);

module.exports = router;
