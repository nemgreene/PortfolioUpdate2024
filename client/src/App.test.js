import {
  paramsExtraction,
  taggedParams,
} from "./Bin/LoggerBuddy/components/Utility";

test("Dash to tags", () => {
  let val = taggedParams({
    url: { pathname: "/loggerBuddy" },
    tags: ["tag1", "tag2"],
  });
  expect(val).toEqual("/loggerBuddy/tag1+tag2");
});

test("Dash to streams", () => {
  let val = taggedParams({
    url: { pathname: "/loggerBuddy" },
    streams: ["tag1", "tag2"],
  });
  expect(val).toEqual("/loggerBuddy/*/tag1+tag2");
});

test("Dash to tags and streams", () => {
  let val = taggedParams({
    url: { pathname: "/loggerBuddy" },
    tags: ["tag1", "tag2"],
    streams: ["stream1", "stream2"],
  });
  expect(val).toEqual("/loggerBuddy/tag1+tag2/stream1+stream2");
});

test("Tag to more tags", () => {
  let val = taggedParams({
    url: { pathname: "/loggerBuddy/tag1" },
    tags: ["tag1", "tag2"],
  });
  expect(val).toEqual("/loggerBuddy/tag1+tag2");
});

test("Tags to fewer tags", () => {
  let val = taggedParams({
    url: { pathname: "/loggerBuddy/tag1+tag2" },
    tags: ["tag1"],
  });
  expect(val).toEqual("/loggerBuddy/tag1");
});

test("Dash with stream to tags", () => {
  let val = taggedParams({
    url: { pathname: "/loggerBuddy/*/stream1" },
    tags: ["tag1"],
  });
  expect(val).toEqual("/loggerBuddy/tag1");
});

// https://qa-nora.medium.com/unit-testing-with-jest-and-integration-with-github-actions-bc241b31d257
