const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Register a new user
exports.register = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = jwt.sign({ _id: user._id }, "your_jwt_secret");
    res.status(201).json({ token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Login a user
exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ _id: user._id }, "your_jwt_secret");
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
