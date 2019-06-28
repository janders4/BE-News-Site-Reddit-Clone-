exports.error400 = (err, req, res, next) => {
  const codes400 = ["23502", "42702", "42703", "22P02"];
  const message = { msg: "error: bad request" };
  return codes400.includes(err.code)
    ? res.status(400).send(message)
    : next(err);
};

exports.error405 = (req, res, next) => {
  const message = { msg: "error: bad method" };
  res.status(405).send(message);
};
exports.error404 = (err, req, res, next) => {
  //TODO 42702 add handler for this error collum ambiguous
  const codes = ["23503", "22003"];
  if (err.status === 404 || codes.includes(err.code)) {
    const message = { msg: "error: not found" };
    res.status(404).send(message);
  }
};
