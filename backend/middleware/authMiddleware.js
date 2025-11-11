const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(403).send({ message: "No Token Provided" });

  try {
    jwt.verify(token, "SECRET123");
    next();
  } catch {
    res.status(403).send({ message: "Invalid Token" });
  }
};
