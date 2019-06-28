process.env.NODE_ENV = "test";
const { app } = require("../app");
const request = require("supertest")(app);
const chai = require("chai");
const expect = chai.expect;
const { connection } = require("../db/connection");
chai.use(require("chai-sorted"));

describe("/api", () => {
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
      it("returns 404 if no user exists", () => {
        return request.get("/api/users/donkey_kong").expect(404);
      });
    });
  });
  describe("/articles", () => {
    describe("/articles only returns array of articles", () => {
      it("returns an array of article objects", () => {
        return request
          .get("/api/articles")
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an("array");
          });
      });
      it("can sort by any collumn and defaults to date", () => {
        return request
          .get("/api/articles/")
          .expect(200)
          .then(res => {
            expect(res.body).to.be.descendingBy("created_at");
          });
      });
      it("can sort by any collumns by query", () => {
        return request
          .get("/api/articles/?sort_by=author&order=asc")
          .expect(200)
          .then(res => {
            expect(res.body).to.be.ascendingBy("author");
          });
      });
      it("can filter by any auther or topic by query", () => {
        return request.get("/api/articles/?author=rogersop").expect(200);
      });
      it("can filter by any auther or topic by query", () => {
        return request.get("/api/articles/?topic=mitch").expect(200);
      });
      it("returns a 405 error when bad method used", () => {
        return request.delete("/api/articles/").expect(405);
      });
      it("returns 404 for bad path", () => {
        return request.get("/api/articlez/").expect(404);
      });
    });

    describe("/:articles_id", () => {
      describe("GET articles by id", () => {
        it("happy path, gets article by id", () => {
          return request
            .get("/api/articles/1")
            .expect(200)
            .then(res => {
              expect(res.body).to.be.an("object");
              expect(res.body.article.comment_count).to.equal(13);
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
        it.only("returns 200 if no body is passed and returns unchanged object", () => {
          return request.patch("/api/articles/1").expect(200);
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
              expect(res.body.comment).to.have.keys(
                "article_id",
                "author",
                "body",
                "comment_id",
                "created_at",
                "votes"
              );
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
            body: 1
          };
          return request
            .post("/api/articles/1/comments")
            .send(postObject)
            .expect(404);
        });
        it("returns 404 for bad path", () => {
          return request.post("/api/articles/10000/ccc").expect(404);
        });

        it("returns 400 if invalid article id", () => {
          const postObject = {
            username: "lurker",
            body: "don't be fooled, this book is pure filth"
          };
          return request
            .post("/api/articles/donkeykong12/comments")
            .send(postObject)
            .expect(400);
        });
        it("returns 404 if user doesnt exist", () => {
          const postObject = {
            username: "daveyjones",
            body: "don't be fooled, this book is pure filth"
          };
          return request
            .post("/api/articles/1/comments")
            .send(postObject)
            .expect(404);
        });
        it("returns 400 when allrequired keys are no preset in post object", () => {
          const postObject = {};
          return request
            .post("/api/articles/1/comments")
            .send(postObject)
            .expect(400);
        });
        it("returns 404 if article doesn't exsit", () => {
          const postObject = {
            username: "lurker",
            body: "don't be fooled, this book is pure filth"
          };
          return request
            .post("/api/articles/1000420/comments")
            .send(postObject)
            .expect(404);
        });
      });
      describe("get comment by article id. /articles/:article_id/comments", () => {
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
        it("returns 404 if article doesnt exist", () => {
          return request.get("/api/articles/10000/comments").expect(404);
        });
      });
    });
  });
  describe("/comments", () => {
    describe("/comments/:commentID", () => {
      describe("patch", () => {
        it("happy path - increments votes using patch objects", () => {
          const patchObj = { inc_votes: 2 };
          return request
            .patch("/api/comments/1")
            .send(patchObj)
            .expect(200)
            .then(({ body: { comment: { votes } } }) => {
              expect(votes).to.equal(18);
            });
        });
        it("decrements votes if passed negative number", () => {
          const patchObj = { inc_votes: -2 };
          return request
            .patch("/api/comments/1")
            .send(patchObj)
            .expect(200)
            .then(({ body: { comment: { votes } } }) => {
              expect(votes).to.equal(14);
            });
        });
        it("returns a 405 error when bad method used", () => {
          return request.get("/api/comments/1").expect(405);
        });
        it("returns 404 for bad path", () => {
          return request.get("/api/comments/").expect(404);
        });
        it("returns 400 when patching a value with incorrect type", () => {
          const patchObject = { inc_votes: "one" };
          return request
            .patch("/api/comments/1")
            .send(patchObject)
            .expect(400);
        });
        it("returns 400 when missing required columns", () => {
          const patchObject = { not_real: 1 };
          return request
            .patch("/api/comments/1")
            .send(patchObject)
            .expect(400);
        });
        it("returns 404 if a user is not found with an invalid id", () => {
          const patchObj = { inc_votes: 2 };
          return request
            .patch("/api/comments/daveyjones")
            .send(patchObj)
            .expect(400);
        });
        it("returns 404 when valid id passed but does not exist", () => {
          const patchObj = { inc_votes: 2 };
          return request
            .patch("/api/comments/11111111111")
            .send(patchObj)
            .expect(404);
        });
      });
      describe("delete", () => {
        it("204 deletes the comment by id", () => {
          return request.del("/api/comments/1").expect(204);
        });
        it("returns a 405 error when bad method used", () => {
          return request.get("/api/comments/1").expect(405);
        });
        it("returns 404 for bad path", () => {
          return request.del("/api/comments/").expect(404);
        });
        it("returns 404 for non existant comment", () => {
          return request.del("/api/comments/7000000").expect(404);
        });
      });
    });
  });
});

describe("/api/", () => {
  it("returns a json of all available endpoints", () => {
    return request.get("/api/").expect(200);
  });
  it("returns 405 for bad method", () => {
    return request.del("/api/").expect(405);
  });
});
