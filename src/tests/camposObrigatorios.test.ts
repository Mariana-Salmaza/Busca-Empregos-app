import request from "supertest";
import app from "../app";

describe("Criação de usuário - Campos obrigatórios", () => {
  it("deve falhar se o nome não for fornecido", async () => {
    const res = await request(app).post("/api/users").send({
      email: "teste@email.com",
      password: "senha123",
      CPF: "12345678901",
    });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Todos os campos são obrigatórios");
  });

  it("deve falhar se o email não for fornecido", async () => {
    const res = await request(app).post("/api/users").send({
      name: "Teste",
      password: "senha123",
      CPF: "12345678901",
    });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Todos os campos são obrigatórios");
  });

  it("deve falhar se a senha não for fornecida", async () => {
    const res = await request(app).post("/api/users").send({
      name: "Teste",
      email: "teste@email.com",
      CPF: "12345678901",
    });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Todos os campos são obrigatórios");
  });

  it("deve falhar se o CPF não for fornecido", async () => {
    const res = await request(app).post("/api/users").send({
      name: "Teste",
      email: "teste@email.com",
      password: "senha123",
    });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Todos os campos são obrigatórios");
  });
});
