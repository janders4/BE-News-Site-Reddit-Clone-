const { expect } = require("chai");
const { formatDate, makeRefObj, formatComments } = require("../db/utils/utils");

describe("formatDate", () => {
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
  it("works for an array of objects", () => {
    expect(formatDate(testData)).to.eql([
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: "Thu Nov 15 2018 12:21:54 GMT+0000 (Greenwich Mean Time)",
        votes: 100
      }
    ]);
  });
  it("doesnt mutate original array", () => {
    expect(formatDate(testData)).to.not.equal(testData);
  });
});

describe("makeRefObj", () => {
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
      "1": "Living in the shadow of a great man"
    });
  });
  it("works for multiple objects in an array", () => {
    expect(makeRefObj(testData2)).to.eql({
      "1": "Living in the shadow of a great man",
      "1": "Living in the shadow of a great man"
    });
  });
});

describe.only("formatComments", () => {
  it("returns a new array", () => {
    const input = [];
    expect(formatComments(input)).to.not.equal(input);
  });
  // it("changes the keys of a single object in an array", () => {
  //   const testData = [
  //     {
  //       body:
  //         "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
  //       belongs_to:
  //         "The People Tracking Every Touch, Pass And Tackle in the World Cup",
  //       created_by: "tickle122",
  //       votes: -1,
  //       created_at: 1468087638932
  //     }
  //   ];
  //   const output = [
  //     {
  //       body:
  //         "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
  //       article_id:
  //         "The People Tracking Every Touch, Pass And Tackle in the World Cup",
  //       author: "tickle122",
  //       votes: -1,
  //       created_at: "Sat Jul 09 2016 19:07:18 GMT+0100 (British Summer Time)"
  //     }
  //   ];
  //   expect(formatComments(testData)).to.eql(output);
  // });
  // it("changes the time to javascript object", () => {
  //   const testData = [
  //     {
  //       body:
  //         "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
  //       belongs_to:
  //         "The People Tracking Every Touch, Pass And Tackle in the World Cup",
  //       created_by: "tickle122",
  //       votes: -1,
  //       created_at: 1468087638932
  //     }
  //   ];
  //   const output = [
  //     {
  //       body:
  //         "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
  //       article_id:
  //         "The People Tracking Every Touch, Pass And Tackle in the World Cup",
  //       author: "tickle122",
  //       votes: -1,
  //       created_at: "Sat Jul 09 2016 19:07:18 GMT+0100 (British Summer Time)"
  //     }
  //   ];
  //   expect(formatComments(testData)).to.eql(output);
  // });
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
        created_at: 1468087638932
      }
    ];
    const output = [
      {
        body:
          "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
        article_id: "1",
        author: "tickle122",
        votes: -1,
        created_at: "Sat Jul 09 2016 19:07:18 GMT+0100 (British Summer Time)"
      }
    ];
    expect(formatComments(testData, dummyref)).to.eql(output);
  });
});
