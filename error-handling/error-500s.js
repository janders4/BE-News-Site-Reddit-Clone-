exports.error500s = (err, req, res, next) => {
  res.status(500).send({ msg: "internal server error " });
};
