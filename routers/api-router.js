const express = require("express");
const { getTopics } = require("../controllers/topics-controllers");
const apiRouter = express.Router();
const { error405 } = require("../error-handling/error-400s");

apiRouter
  .route("/topics")
  .get(getTopics)
  .all(error405);

module.exports = { apiRouter };
