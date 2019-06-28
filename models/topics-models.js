const { connection } = require("../db/connection");
exports.fetchTopics = () => {
  return connection
    .select("*")
    .from("topics")
    .returning("*")
    .then(data => {
      console.log(data);
      return { topics: data };
    });
};
