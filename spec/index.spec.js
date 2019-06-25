process.env.NODE_ENV = "test";
const { app } = require("../app");
const request = require("supertest")(app);
const chai = require("chai");
const expect = chai.expect;
const { connection } = require("../connection");

describe.only("/api", () => {
  beforeEach(() => {
    return connection.seed.run();
  });
  after(() => {
    return connection.destroy();
  });
  describe("/topics", () => {
    describe("get request", () => {
      it("gets an array of topic objects with keys slug and description", () => {
        return request
          .get("/api/topics")
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an("object");
          });
      });
      it("returns a 405 error when bad method used", () => {
        return request.post("/api/topics").expect(405);
      });
    });
  });
  describe("/users", () => {
    describe("get by id method", () => {
      it("happy path, gets user by username", () => {
        return request
          .get("/api/users/butter_bridge")
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an("object");
          });
      });
      it("returns a 405 error when bad method used", () => {
        return request.post("/api/users/butter_bridge").expect(405);
      });
    });
  });
});
