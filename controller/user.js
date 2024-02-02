const fs = require("fs");
const data = JSON.parse(fs.readFilieSync("data.json", "utf-8"));
const users = data.users;

exports.createUser = (req, res) => {
  users.push(req.body);
  res.status(201).json(req.body);
};
