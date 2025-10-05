const {signup , login} = require("../Controller/AuthController");
const { signupValidation, loginValidation } = require("../Middlewares/AuthValidation");
const PassValidation = require("../Middlewares/PasswordValidation");

const router = require("express").Router()

router.post("/login", loginValidation , login )

router.post("/signup", signupValidation, PassValidation, signup)

module.exports = router; 