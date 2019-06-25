process.env.NODE_ENV = "test";
const { app } = require("../app");
const request = require("supertest")(app);
const chai = require("chai");
const expect = chai.expect;
const { connection } = require("../connection");

describe.only("/api/topics", () => {
  beforeEach(() => {
    return connection.seed.run();
  });
  after(() => {
    return connection.destroy();
  });
  describe("get request", () => {
    it("gets an array of topic objects with keys slug and description", () => {
      return request
        .get("/api/topics")
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an("object");
        });
    });
  });
});
