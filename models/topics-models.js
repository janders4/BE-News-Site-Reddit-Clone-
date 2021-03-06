const { connection } = require("../db/connection");
exports.fetchTopics = () => {
  return connection
    .select("*")
    .from("topics")
    .returning("*")
    .then(data => {
      return { topics: data };
    });
};
