const bcrypt = require("bcryptjs");
const User = require("../../models/user");

const registerUser = async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json({ msg: "User registered successfully" });
  } catch (e) {
    console.log("error", e);

    res.status(500).json({
      msg: "unable to register",
      e,
    });
  }
};

module.exports = { registerUser };
