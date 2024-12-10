const jwt = require('jsonwebtoken');
const { UNAUTHORIZED } = require("../utils/errors");
const JWT_SECRET = require("../utils/config");

function auth(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(UNAUTHORIZED).send({ message: "Authorization required" });
  }
  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch {
    return res.status(UNAUTHORIZED).send({ message: "Authorization required" });
  }
  req.user = payload; // { _id: .. }
  return next();
}

module.exports = auth;