import "@jest/globals";

describe("Example test", () => {
  it("should pass", () => {
    expect(true).toBe(true);
  });
  it("should fail", () => {
    expect(true).toBe(false);
  });
});
