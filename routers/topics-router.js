const express = require("express");
const { getTopics } = require("../controllers/topics-controllers");
const { error405 } = require("../error-handling/error-400s");
const topicsRouter = express.Router();

topicsRouter
  .route("/")
  .get(getTopics)
  .all(error405);

module.exports = { topicsRouter };
