const { expect } = require("chai");
const { formatDate, makeRefObj, formatComments } = require("../db/utils/utils");

describe.skip("formatDate", () => {
  const testData = [
    {
      title: "Living in the shadow of a great man",
      topic: "mitch",
      author: "butter_bridge",
      body: "I find this existence challenging",
      created_at: 1542284514171,
      votes: 100
    }
  ];
  it("returns a new array", () => {
    const input = [];
    expect(formatDate(input)).to.not.equal(input);
  });
  it("changes the date for multiple objects stored in an array", () => {
    expect(formatDate(testData)).to.eql([
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: new Date(1542284514171),
        votes: 100
      }
    ]);
  });
  it("doesnt mutate original array", () => {
    expect(formatDate(testData)).to.not.equal(testData);
  });
});

describe.skip("makeRefObj", () => {
  const testData = [
    {
      article_id: "1",
      title: "Living in the shadow of a great man",
      topic: "mitch",
      author: "butter_bridge",
      body: "I find this existence challenging",
      created_at: 1542284514171,
      votes: 100
    }
  ];
  const testData2 = [
    {
      article_id: "1",
      title: "Living in the shadow of a great man",
      topic: "mitch",
      author: "butter_bridge",
      body: "I find this existence challenging",
      created_at: 1542284514171,
      votes: 100
    },
    {
      article_id: "1",
      title: "Living in the shadow of a great man",
      topic: "mitch",
      author: "butter_bridge",
      body: "I find this existence challenging",
      created_at: 1542284514171,
      votes: 100
    }
  ];
  it("returns an object when passed an array", () => {
    expect(makeRefObj([])).to.eql({});
  });
  it("returns a ref object when passed an array of 1 object", () => {
    expect(makeRefObj(testData)).to.eql({
      "Living in the shadow of a great man": "1"
    });
  });
  it("works for multiple objects in an array", () => {
    expect(makeRefObj(testData2)).to.eql({
      "Living in the shadow of a great man": "1",
      "Living in the shadow of a great man": "1"
    });
  });
});

describe.skip("formatComments", () => {
  it("returns a new array", () => {
    const input = [];
    expect(formatComments(input)).to.not.equal(input);
  });
  it("article_id must be the id corresponding to the original title value provided", () => {
    const dummyref = makeRefObj([
      {
        article_id: "1",
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100
      }
    ]);
    const testData = [
      {
        body:
          "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
        belongs_to: "Living in the shadow of a great man",
        created_by: "tickle122",
        votes: -1,
        created_at: new Date(1468087638932)
      }
    ];
    const output = [
      {
        body:
          "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
        article_id: "1",
        author: "tickle122",
        votes: -1,
        created_at: new Date(1468087638932)
      }
    ];
    expect(formatComments(testData, dummyref)).to.eql(output);
  });
});
