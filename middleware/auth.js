const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const publicKey = fs.readFileSync(
  path.resolve(__dirname, "../public.key"),
  "utf-8"
);

const auth = (req, res, next) => {
  const token = req.get("Authorization").split("Bearer ")[1];
  var decoded = jwt.verify(token, publicKey);
  try {
    if (decoded.id) {
      next();
    }
  } catch (error) {
    res.sendStatus(401);
  }
};

module.exports = auth;
