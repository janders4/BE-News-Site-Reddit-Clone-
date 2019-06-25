const express = require("express");
const { getUserById } = require("../controllers/users-controller");
const { error405 } = require("../error-handling/error-400s");
const usersRouter = express.Router();

usersRouter
  .route("/:username")
  .get(getUserById)
  .all(error405);

module.exports = { usersRouter };
