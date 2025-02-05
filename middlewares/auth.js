const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const UnauthorizedError = require("../errors/UnauthorizedError");

function auth(req, res, next) {
  const { authorization } = req.headers;
  console.log(authorization);
  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new UnauthorizedError("Authorization required");
  }
  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    console.log(JWT_SECRET);
    payload = jwt.verify(token, JWT_SECRET);
  } catch {
    throw new UnauthorizedError("Authorization required");
  }
  req.user = payload;
  return next();
}

module.exports = auth;
