function soma(a: number, b: number): number {
  return a + b;
}

test("soma 2 + 2 deve ser 4", () => {
  expect(soma(2, 2)).toBe(4);
});
