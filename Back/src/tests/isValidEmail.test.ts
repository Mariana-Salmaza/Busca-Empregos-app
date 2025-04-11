import { isValidEmail } from "../validators/emailValidation";

describe("Validação de e-mail", () => {
  it("deve aceitar e-mails válidos", () => {
    const emailsValidos = [
      "teste@email.com",
      "usuario.123@dominio.net",
      "user_name@exemplo.org",
      "nome+alias@gmail.com",
    ];

    emailsValidos.forEach((email) => {
      expect(isValidEmail(email)).toBe(true);
    });
  });

  it("deve recusar e-mails inválidos", () => {
    const emailsInvalidos = [
      "email@",
      "email.com",
      "email@com",
      "@dominio.com",
      "email@.com",
      "email@dominio..com",
      "   ",
      "",
    ];

    emailsInvalidos.forEach((email) => {
      expect(isValidEmail(email)).toBe(false);
    });
  });
});
