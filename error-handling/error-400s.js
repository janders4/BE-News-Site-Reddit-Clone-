exports.error405 = (req, res, next) => {
  const message = { msg: "error: bad method" };
  return res
    .status(405)
    .send(message)
    .catch(next);
};

exports.error400s = (err, req, res, next) => {
  const codes = [];
  console.log(err.code);
  const message = { msg: "error: bad method" };
  return codes.includes(err.code) ? res.status(405).send(message) : next(err);
};
