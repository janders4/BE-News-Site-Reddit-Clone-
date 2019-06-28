const express = require("express");
const apiRouter = express.Router();
const { error405 } = require("../error-handling/error-400s");
const { topicsRouter } = require("./topics-router");
const { usersRouter } = require("./users-router");
const { articlesRouter } = require("./articles-router");
const { commentsRouter } = require("./comments-router");
const endpoints = require("../endpoints.json");

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentsRouter);

apiRouter
  .route("/")
  .get((req, res, next) => {
    res.status(200).send(endpoints);
  })
  .all(error405);

module.exports = { apiRouter };
