import { difficultyToColor, popularityToColor } from "./SpotUtils";

describe("difficultyToColor", () => {
  test("gives the right color for easy", () => {
    expect(difficultyToColor("easy")).toEqual("green");
  });
  test("gives the right color for medium", () => {
    expect(difficultyToColor("medium")).toEqual("teal");
  });
  test("gives the right color for hard", () => {
    expect(difficultyToColor("hard")).toEqual("orange");
  });
  test("gives the right color for xtreme", () => {
    expect(difficultyToColor("xtreme")).toEqual("red");
  });
  test("gives the right color for default", () => {
    expect(difficultyToColor("this is not a valid difficulty")).toEqual("gray");
  });
});

describe("popularityToColor", () => {
  test("gives the right color for low", () => {
    expect(popularityToColor("low")).toEqual("green.400");
  });
  test("gives the right color for medium", () => {
    expect(popularityToColor("medium")).toEqual("orange.400");
  });
  test("gives the right color for high", () => {
    expect(popularityToColor("high")).toEqual("red.400");
  });
  test("gives the right color for default", () => {
    expect(popularityToColor("this is not a valid popularity")).toEqual(
      "gray.300"
    );
  });
});
