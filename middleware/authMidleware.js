const jwt = require("jsonwebtoken");
const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startwith("bearer ")) {
    return res.status(401).send({ message: "Please provide a valid token" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (e) {
    res.status(400).send({ message: "Invalid token" });
  }
};
module.exports = protect;
