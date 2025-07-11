const express = require("express");
const router = express.Router();
const { loginUser } = require("../controllers/auth/loginUser");

const { registerUser } = require("../controllers/auth/registerUser");
router.post("/register", registerUser);
router.post("/login", loginUser);
module.exports = router;
