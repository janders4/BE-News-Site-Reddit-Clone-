exports.error400 = (err, req, res, next) => {
  const codes = ["22P02", "23503", "23502", "42702", "42703"];
  //console.log(err.code);
  const message = { msg: "error: bad request" };
  return codes.includes(err.code) ? res.status(400).send(message) : next(err);
};

exports.error405 = (req, res, next) => {
  const message = { msg: "error: bad method" };
  res
    .status(405)
    .send(message)
    .catch(next);
};
exports.error404 = (err, req, res, next) => {
  //TODO 42702 add handler for this error collum ambiguous
  if (err.status === 404) {
    const message = { msg: "bad request" };
    res
      .status(404)
      .send(message)
      .catch(next);
  }
};
