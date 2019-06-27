const {
  updateVotes,
  deleteCommentById
} = require("../controllers/comments-controller");
const { error405 } = require("../error-handling/error-400s");
const express = require("express");
const commentsRouter = express.Router();

commentsRouter
  .route("/:comment_id")
  .patch(updateVotes)
  .delete(deleteCommentById)
  .all(error405);

module.exports = { commentsRouter };
