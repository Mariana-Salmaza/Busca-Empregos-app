import { isValidCPF } from "../validators/validateCPF";

describe("validateCPF", () => {
  test("Deve validar um CPF válido", () => {
    expect(isValidCPF("970.206.240-30")).toBe(true);
  });

  test("Deve retornar false para um CPF inválido", () => {
    expect(isValidCPF("123.456.789-00")).toBe(false);
  });

  test("Deve retornar false para um CPF com caracteres inválidos", () => {
    expect(isValidCPF("abc.def.ghi-jk")).toBe(false);
  });

  test("Deve retornar false para um CPF vazio", () => {
    expect(isValidCPF("")).toBe(false);
  });
});
