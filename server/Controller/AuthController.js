const UserModel = require("../Modals/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { name, password, email } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists. Please Login.",
        success: false,
      });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ name, password: hashedPassword, email });
    await newUser.save();

    return res
      .status(201)
      .json({ message: "SignUp Successful", success: true });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { password, email } = req.body;
    const existingUser = await UserModel.findOne({ email });
    const errorMsg = "Auth failed!! Email or password mismatch.";
    if (!existingUser) {
      return res.status(403).json({ message: errorMsg, success: false });
    }

    // check wether the password is correct

    const isCorrectPass = await bcrypt.compare(password, existingUser.password);
    if (!isCorrectPass) {
      return res.status(403).json({ message: errorMsg, success: false });
    }

    const jwtToken = jwt.sign(
      { email: existingUser.email, _id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(200).json({
      message: "Login Succesfull",
      success: true,
      jwtToken,
      email,
      name: existingUser.name,
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: err.message,
    });
  }
};

module.exports = {
  signup,
  login,
};
