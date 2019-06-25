const {
  fetchArticleById,
  patchVotesById
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

exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  //console.log({ article_id });
  const patchObject = req.body;
  patchVotesById(patchObject, article_id)
    .then(article => {
      console.log(article);
      res.status(200).send(article);
    })
    .catch(next);
};
