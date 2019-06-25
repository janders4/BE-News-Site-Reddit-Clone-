const { connection } = require("../connection");

exports.fetchUserById = username => {
  return connection
    .select("*")
    .from("users")
    .where({ username })
    .returning("*")
    .then(data => {
      return data;
    });
};
