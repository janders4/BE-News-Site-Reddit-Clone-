const { connection } = require("../connection");
exports.fetchTopics = () => {
  return connection
    .select("*")
    .from("topics")
    .returning("*")
    .then(data => {
      console.log({ topics: data });
      return { topics: data };
    });
};
