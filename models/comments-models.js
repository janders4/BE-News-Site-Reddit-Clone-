const { connection } = require("../connection");

exports.patchVotes = ({ inc_votes }, comment_id) => {
  return connection("comments")
    .where(comment_id)
    .increment({ votes: inc_votes })
    .returning("*")
    .then(([comment]) => {
      return { comment };
    });
};

exports.deleteComment = id => {
  return connection("comments")
    .where(id)
    .del()
    .returning("*")
    .then(data => {
      if (data.length === 0) {
        return Promise.reject({ status: 404 });
      } else return data;
    });
};
