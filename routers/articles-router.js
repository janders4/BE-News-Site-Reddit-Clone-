const express = require("express");
const {
  getArticleById,
  patchArticleById,
  postCommentById,
  getCommentById,
  getArticlesNoId
} = require("../controllers/articles-controllers");
const { error405 } = require("../error-handling/error-400s");
const articlesRouter = express.Router();

articlesRouter
  .route("/")
  .get(getArticlesNoId)
  .all(error405);

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleById)
  .all(error405);

articlesRouter
  .route("/:article_id/comments")
  .post(postCommentById)
  .get(getCommentById)
  .all(error405);

module.exports = { articlesRouter };
