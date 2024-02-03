const express = require("express");
const userController = require("../controller/user");
const authorization = require("../middleware/auth");
const router = express.Router();

router
  .post("/", userController.createUser)
  .get("/", authorization, userController.getAllUsers)
  .get("/:id", authorization, userController.getUser)
  .put("/:id", authorization, userController.replaceUser)
  .patch("/:id", authorization, userController.updateUser)
  .delete("/:id", authorization, userController.deleteUser);

exports.router = router;
