exports.error405 = (req, res, next) => {
  const message = { msg: "error: bad method" };
  res
    .status(405)
    .send(message)
    .catch(next);
};
exports.error404 = (err, req, res, next) => {
  if (err.status === 404) {
    const message = { msg: "bad request" };
    res
      .status(404)
      .send(message)
      .catch(next);
  }
};

exports.error400s = (err, req, res, next) => {
  const codes = [];
  //console.log(err);
  const message = { msg: "error: bad method" };
  return codes.includes(err.code) ? res.status(405).send(message) : next(err);
};
