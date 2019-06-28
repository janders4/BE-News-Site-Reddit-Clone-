const { connection } = require("../db/connection");

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
      console.log(article);
      if (!article) {
        return Promise.reject({ status: 404, message: "not found" });
      } else {
        article.comment_count = parseInt(article.comment_count);
        return article;
      }
    });
};

exports.fetchArticlesNoId = params => {
  return connection
    .select("articles.*")
    .from("articles")
    .modify(query => {
      if (params.author) query.where({ "articles.author": params.author });
      if (params.topic) query.where({ "articles.topic": params.topic });
    })
    .returning("*")
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .count("articles.article_id as comment_count")
    .orderBy(params.sort_by || "created_at", params.order || "DESC")
    .then(articles => {
      articles.forEach(
        article => (article.comment_count = parseInt(article.comment_count))
      );
      return articles;
    });
};

exports.patchVotesById = (patchObject = { inc_votes: 0 }, article_id) => {
  return connection("articles")
    .where({ article_id })
    .increment({ votes: patchObject.inc_votes })
    .returning("*")
    .then(([article]) => {
      if (patchObject.inc_votes === 0) {
        return Promise.reject({ status: 401, article: article });
      } else return article;
    });
};

exports.postComment = (postObject, article_id) => {
  return connection("comments")
    .where({ article_id })
    .insert({
      author: postObject.username,
      body: postObject.body,
      article_id: article_id
    })
    .returning("*")
    .then(([comment]) => {
      if (comment.length === 0) {
        return Promise.reject({ status: 404 });
      } else return comment;
    });
};

exports.getComment = (article_id, params) => {
  return connection("comments")
    .select("*")
    .where({ article_id })
    .returning("*")
    .orderBy(params.sort_by || "created_at", params.order || "DESC")
    .then(comment => {
      if (comment.length === 0) {
        return Promise.reject({ status: 404 });
      } else return comment;
    });
};
