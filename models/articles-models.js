const { connection } = require("../connection");

exports.fetchArticleById = article_id => {
  return connection
    .select("*")
    .from("articles")
    .where({ article_id })
    .returning("*")
    .then(([article]) => {
      if (!article) {
        return Promise.reject({ status: 404, message: "not found" });
      }
      return { article: article };
    });
};

exports.patchVotesById = (patchObject, article_id) => {
  return connection("articles")
    .where({ article_id })
    .increment({ votes: patchObject.inc_votes })
    .returning("*")
    .then(([article]) => {
      return { article: article };
    });
};
