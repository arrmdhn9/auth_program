require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "You must login" });
  }
};

exports.authorize = (allowRoles) => {
  return (req, res, next) => {
    if (!allowRoles.includes(req.user.role)) {
      return res.stauts(403).json({ message: "Access Forbidden!" });
    }
    next();
  };
};
