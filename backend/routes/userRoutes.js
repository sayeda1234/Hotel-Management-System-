const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authmiddleware");
const User = require("../models/userModel");

router.get("/profile", verifyToken, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
});

module.exports = router;
