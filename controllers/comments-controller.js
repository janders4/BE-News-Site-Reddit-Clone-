const { patchVotes, deleteComment } = require("../models/comments-models");

exports.updateVotes = (req, res, next) => {
  const commentId = req.params;
  const patchObject = req.body;
  patchVotes(patchObject, commentId)
    .then(comment => {
      res.status(200).send({ comment });
    })
    .catch(next);
};

exports.deleteCommentById = (req, res, next) => {
  const commentId = req.params;
  deleteComment(commentId)
    .then(comment => {
      res.status(204).send();
    })
    .catch(next);
};
