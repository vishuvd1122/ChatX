const validatePass = require("validate-password");
const validator = new validatePass();

const PassValidation = (req, res, next) => {
  const { password } = req.body;  // Fixed: removed extra .password
  const isValidPassword = validator.checkPassword(password);
  if (!isValidPassword.isValid) {
    return res
      .status(400)
      .json({ message: "Enter a strong password.", success: false });
  }
  next();
};


module.exports = PassValidation