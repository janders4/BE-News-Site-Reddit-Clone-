const express = require("express");
const {
  getArticleById,
  patchArticleById
} = require("../controllers/articles-controllers");
const { error405 } = require("../error-handling/error-400s");
const articlesRouter = express.Router();

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleById)
  .all(error405);

module.exports = { articlesRouter };
