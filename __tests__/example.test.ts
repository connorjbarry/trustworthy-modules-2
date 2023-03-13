import "@jest/globals";

describe("Example test", () => {
  it("should pass with true == true", () => {
    expect(true).toBe(true);
  });
  it("should pass with true != false", () => {
    expect(true).not.toBe(false);
  });
});
