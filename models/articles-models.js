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

exports.postComment = (postObject, article_id) => {
  return connection("comments")
    .where({ article_id })
    .insert({ author: postObject.username, body: postObject.body })
    .returning("*")
    .then(([comment]) => {
      return { comment: { comment } };
    });
};

//insert params for sorting query
exports.getComment = (article_id, params) => {
  return connection("comments")
    .select("*")
    .where({ article_id })
    .returning("*")
    .orderBy(params.sort_by || "created_at", params.order || "DESC")
    .then(comment => {
      return comment;
    });
};
