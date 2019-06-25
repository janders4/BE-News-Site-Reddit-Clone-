const express = require("express");
const { getTopics } = require("../controllers/topics-controllers");
const apiRouter = express.Router();

apiRouter.use("/topics", getTopics);

module.exports = { apiRouter };
