// controllers/users.js
const User = require("../models/User");
const jwt = require("jsonwebtoken");


const createUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }
    const user = new User({ email, password, role });
    await user.save();
    res.status(201).json({ message: "User created", user: { email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error: error.message });
  }
};


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    // Generate JWT
    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({ token, user: { email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: "Login error", error: error.message });
  }
};

module.exports = { createUser, loginUser  };
