const {
  fetchArticleById,
  fetchArticlesNoId,
  patchVotesById,
  postComment,
  getComment
} = require("../models/articles-models");

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticleById(article_id)
    .then(article => {
      //console.log(article);
      res.status(200).send(article);
    })
    .catch(next);
};

exports.getArticlesNoId = (req, res, next) => {
  fetchArticlesNoId(req.query)
    .then(articles => {
      res.status(200).send(articles);
    })
    .catch(next);
};

exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const patchObject = req.body;
  patchVotesById(patchObject, article_id)
    .then(article => {
      console.log(article);
      res.status(200).send(article);
    })
    .catch(next);
};

exports.postCommentById = (req, res, next) => {
  const { article_id } = req.params;
  const postObject = req.body;
  postComment(postObject, article_id)
    .then(comment => {
      res.status(201).send(comment);
    })
    .catch(next);
};

exports.getCommentById = (req, res, next) => {
  const { article_id } = req.params;
  const quieries = req.query;
  getComment(article_id, quieries)
    .then(comment => {
      res.status(200).send(comment);
    })
    .catch(next);
};
