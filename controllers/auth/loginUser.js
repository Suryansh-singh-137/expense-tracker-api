const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const loginUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    // checking user existance
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(500).json({
        msg: "user not found",
      });
    }
    // if user is already there then matching the passsword of the existing user and the password which he gave in the body
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }
    //  creating jwt token for the user if the password maatched
    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    // sendi n the created token to the registered user for further task
    res.status(200).json({
      msg: "login succesfull",
      token,
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
      },
    });
  } catch (e) {
    console.error("Login error:", e);
    res.status(500).json({ msg: "Login failed", error: e.message });
  }
};
module.exports = { loginUser };
