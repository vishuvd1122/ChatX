const jwt = require("jsonwebtoken");

const isUserAuthenticated = (req, res, next) => {
  const auth = req.headers["authorization"];
  if (!auth) {
    return res
      .status(401)
      .json({ message: "Unauthorized User! No token provided", success: false });
  }
  
  // Extract token from "Bearer <token>" format
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : auth;
  
  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized User! Invalid token format", success: false });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({
        message: "Unauthorized User or invalid JWT token",
        success: false,
        error: error.message
      });
  }
};


module.exports = isUserAuthenticated