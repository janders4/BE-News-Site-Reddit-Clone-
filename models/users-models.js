const { connection } = require("../db/connection");

exports.fetchUserById = username => {
  return connection
    .select("*")
    .from("users")
    .where({ username })
    .returning("*")
    .then(data => {
      if (data.length === 0) {
        return Promise.reject({ status: 404, msg: "invalid user" });
      } else return data;
    });
};
