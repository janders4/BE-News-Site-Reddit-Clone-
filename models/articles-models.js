const { connection } = require("../connection");

exports.fetchArticleById = article_id => {
  return connection
    .select("articles.*")
    .from("articles")
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .where({ "articles.article_id": article_id })
    .groupBy("articles.article_id")
    .count("articles.article_id as comment_count")
    .returning("*")
    .then(([article]) => {
      if (!article) {
        return Promise.reject({ status: 404, message: "not found" });
      } else {
        article.comment_count = parseInt(article.comment_count);
        return { article: article };
      }
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
