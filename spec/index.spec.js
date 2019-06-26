process.env.NODE_ENV = "test";
const { app } = require("../app");
const request = require("supertest")(app);
const chai = require("chai");
const expect = chai.expect;
const { connection } = require("../connection");
chai.use(require("chai-sorted"));

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
  describe("/articles", () => {
    describe("/:articles_id", () => {
      describe("GET articles by id", () => {
        it("happy path, gets article by id", () => {
          return request
            .get("/api/articles/1")
            .expect(200)
            .then(res => {
              expect(res.body).to.be.an("object");
              expect(res.body.article.comment_count).to.equal(1);
            });
        });

        it("returns a 405 error when bad method used", () => {
          return request.post("/api/articles/1").expect(405);
        });
        it("returns 404 for bad path", () => {
          return request.get("/api/articles/10000").expect(404);
        });
      });
      describe('"patch article by id', () => {
        it("happy path, article patched by id", () => {
          const patchObject = { inc_votes: 1 };
          return request
            .patch("/api/articles/1")
            .send(patchObject)
            .expect(200)
            .then(res => {
              expect(res.body.article).to.be.an("object");
              expect(res.body.article.votes).to.equal(101);
            });
        });
        it("decrements the vote count if passed a negative number ", () => {
          const patchObject = { inc_votes: -1 };
          return request
            .patch("/api/articles/1")
            .send(patchObject)
            .expect(200)
            .then(res => {
              expect(res.body.article).to.be.an("object");
              expect(res.body.article.votes).to.equal(99);
            });
        });
        it("returns a 405 error when bad method used", () => {
          return request.post("/api/articles/1").expect(405);
        });
        it("returns 404 for bad path", () => {
          return request.get("/api/articles/10000").expect(404);
        });
        it("returns 400 when patching a value with incorrect type", () => {
          const patchObject = { inc_votes: "one" };
          return request
            .patch("/api/articles/1")
            .send(patchObject)
            .expect(400);
        });
        it("returns 400 when missing required columns", () => {
          const patchObject = { not_real: 1 };
          return request
            .patch("/api/articles/1")
            .send(patchObject)
            .expect(400);
        });
      });
      describe("post comment by article id. /articles/:article_id/comments", () => {
        it("happy path, posts a new comment by article id", () => {
          const postObject = {
            username: "lurker",
            body: "don't be fooled, this book is pure filth"
          };
          return request
            .post("/api/articles/1/comments")
            .send(postObject)
            .expect(201)
            .then(res => {
              expect(res.body.comment).to.be.an("object");
            });
        });
        it("returns a 405 error when bad method used", () => {
          return request.patch("/api/articles/1/comments").expect(405);
        });
        it("returns 400 when missing required columns", () => {
          const postObject = { not_real: 1 };
          return request
            .post("/api/articles/1/comments")
            .send(postObject)
            .expect(400);
        });
        it("returns 400 when patching a value with incorrect type", () => {
          const postObject = {
            username: 12,
            body: "don't be fooled, this book is pure filth"
          };
          return request
            .post("/api/articles/1/comments")
            .send(postObject)
            .expect(400);
        });
        it("returns 404 for bad path", () => {
          return request.post("/api/articles/10000/ccc").expect(404);
        });
      });
      describe.only("get comment by article id. /articles/:article_id/comments", () => {
        it("happy path. gets comments by article_id", () => {
          return request
            .get("/api/articles/1/comments")
            .expect(200)
            .then(res => {
              expect(res.body).to.be.an("array");
            });
        });
        it("is sorted on its default values of created at and desc", () => {
          return request
            .get("/api/articles/1/comments")
            .expect(200)
            .then(res => {
              expect(res.body).to.be.descendingBy("created_at");
            });
        });
        it("can be sorted by a collum passed in the request", () => {
          return request
            .get("/api/articles/1/comments?sort_by=votes&order=asc")
            .expect(200)
            .then(res => {
              expect(res.body).to.be.ascendingBy("votes");
            });
        });
        it("returns a 405 error when bad method used", () => {
          return request.patch("/api/articles/1/comments").expect(405);
        });
        it("returns 404 for bad path", () => {
          return request.get("/api/articles/10000/ccc").expect(404);
        });
        it("returns 400 when sorting by missing columns", () => {
          const postObject = { not_real: 1 };
          return request
            .get("/api/articles/1/comments?sort_by=cabbage&order=asc")
            .expect(400);
        });
      });
    });
  });
});
