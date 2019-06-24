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
  it("", () => {});
});

describe("formatComments", () => {});
