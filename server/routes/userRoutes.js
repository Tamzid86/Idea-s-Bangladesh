// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { createUser, loginUser  } = require("../controllers/users");

// You can protect this route if needed (admin only)
router.post("/create-user", createUser);
router.post("/login", loginUser);
module.exports = router;
