const express = require("express");
const cors = require("cors");
const app = express();
const { apiRouter } = require("./routers/api-router");
const { error500s } = require("./error-handling/error-500s");
const { error400, error404 } = require("./error-handling/error-400s");

app.use(express.json());
app.use(cors());
app.use("/api", apiRouter);

app.all("/*", (req, res, next) => {
  res.status(404).send({ msg: "error 404 - page not found" });
});

//errors
app.use(error400);
app.use(error404);
app.use(error500s);

module.exports = { app };
