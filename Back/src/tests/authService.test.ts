import request from "supertest";
import app from "../app";
import UserModel from "../model/UserModel";

describe("Login de usuário", () => {
  beforeAll(async () => {
    await UserModel.destroy({ where: { email: "teste@email.com" } });

    const user = UserModel.build({
      name: "Usuário Teste",
      email: "teste@email.com",
      password: "123456",
      CPF: "12345678901",
    });

    await user.save();
  });

  afterAll(async () => {
    await UserModel.destroy({
      where: {
        email: [
          "teste@email.com",
          "cpf@email.com",
          "fracounico@email.com",
          "errado@email.com",
          "naocadastrado@email.com",
        ],
      },
    });
  });

  it("deve fazer login com email e senha válidos", async () => {
    const res = await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123456",
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body).toHaveProperty("userId");
  });

  it("deve falhar com email incorreto", async () => {
    const res = await request(app).post("/login").send({
      email: "errado@email.com",
      password: "123456",
    });

    expect(res.status).toBe(404);
    expect(res.body.error).toBe("Usuário não encontrado");
  });

  it("deve falhar com senha incorreta", async () => {
    const res = await request(app).post("/login").send({
      email: "teste@email.com",
      password: "senhaerrada",
    });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Email ou senha inválidos");
  });

  it("deve bloquear login de usuários não cadastrados", async () => {
    const res = await request(app).post("/login").send({
      email: "naocadastrado@email.com",
      password: "123456",
    });

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error", "Usuário não encontrado");
  });

  it("deve falhar ao criar um usuário com CPF inválido", async () => {
    try {
      await UserModel.create({
        name: "Usuário Inválido",
        email: "cpf@email.com",
        password: "123456",
        CPF: "12345678900",
      });
    } catch (error: any) {
      expect(error.message).toBe("CPF inválido");
    }
  });

  it("deve falhar ao criar um usuário com senha fraca", async () => {
    try {
      await UserModel.create({
        name: "Usuário Fraco",
        email: "fracounico@email.com",
        password: "123",
        CPF: "12345678909",
      });
    } catch (error: any) {
      expect(error.message).toBe(
        "A senha não atende aos critérios de segurança"
      );
    }
  });
  it("deve falhar ao criar um usuário com e-mail inválido", async () => {
    try {
      await UserModel.create({
        name: "Usuário Inválido",
        email: "email-invalido",
        password: "senhaSegura123",
        CPF: "98765432100",
      });
    } catch (error: any) {
      expect(error.errors[0].message).toBe("E-mail inválido");
    }
  });
});
