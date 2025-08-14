const express = require("express")
const router = express.Router()
const verifyToken= require("../middleware/auth.js")
const {sendMessage,getMessage} = require("../controller/chatController")

// router.get("/:id",verifyToken,getMessage);
router.post("/",verifyToken,sendMessage);

module.exports= router