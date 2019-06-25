const express = require("express");
const app = express();
const { apiRouter } = require("./routers/api-router");
const { error500s } = require("./error-handling/error-500s");
const { error400s } = require("./error-handling/error-400s");

app.use(express.json());

app.use("/api", apiRouter);

//bad route
app.all("/*", (req, res, next) => {
  res.status(404).send({ msg: "error 404 - page not found" });
});

//errors
app.use(error400s);
app.use(error500s);

module.exports = { app };
