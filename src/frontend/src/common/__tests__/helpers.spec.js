import { generateId, doughDeclension } from "@/common/helpers";

describe("test helpers functions", () => {
  it("test generateId", () => {
    const now = Date.now();
    expect(generateId()).toBeLessThanOrEqual(now);
  });

  it("test doughDeclension", () => {
    const testCase1 = {
      input: "Толстое",
      output: "толстом",
    };
    const testCase2 = {
      input: "тонкое",
      output: "тонком",
    };
    expect(doughDeclension(testCase1.input)).toBe(testCase1.output);
    expect(doughDeclension(testCase2.input)).toBe(testCase2.output);
  });
});
