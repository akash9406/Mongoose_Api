const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.get("Authorization").split("Bearer ")[1];
    var decoded = jwt.verify(token, process.env.SECRET);
    if (decoded.id) {
      next();
    }
  } catch (error) {
    res.sendStatus(401);
  }
};

module.exports = auth;
