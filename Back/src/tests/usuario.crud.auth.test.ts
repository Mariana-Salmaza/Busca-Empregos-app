import request from "supertest";
import app from "../app";

describe("Proteção por autenticação nas rotas de usuários", () => {
  const baseUrl = "/users";

  it("deve bloquear acesso à rota GET /users/get sem token", async () => {
    const res = await request(app).get(baseUrl);
    expect(res.status).toBe(401);
    expect(res.body.error).toBe("Token não fornecido");
  });

  it("deve bloquear acesso à rota GET /users/:id sem token", async () => {
    const res = await request(app).get(`${baseUrl}/1`);
    expect(res.status).toBe(401);
    expect(res.body.error).toBe("Token não fornecido");
  });

  it("deve bloquear acesso à rota PUT /users/:id sem token", async () => {
    const res = await request(app)
      .put(`${baseUrl}/1`)
      .send({ name: "Novo Nome" });
    expect(res.status).toBe(401);
    expect(res.body.error).toBe("Token não fornecido");
  });

  it("deve bloquear acesso à rota DELETE /users/:id sem token", async () => {
    const res = await request(app).delete(`${baseUrl}/1`);
    expect(res.status).toBe(401);
    expect(res.body.error).toBe("Token não fornecido");
  });

  it("deve permitir criação de usuário sem token (POST /users)", async () => {
    const res = await request(app).post("/users").send({
      name: "João",
      email: "joao@email.com",
      password: "123456",
      CPF: "97020624030",
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("user");
  });
});
