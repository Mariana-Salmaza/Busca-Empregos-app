import request from "supertest";
import app from "../app";

describe("Proteção por autenticação nas rotas de usuários", () => {
  const baseUrl = "/api/users";

  it("deve bloquear acesso à rota GET /api/users/get sem token", async () => {
    const res = await request(app).get(baseUrl);
    expect(res.status).toBe(401);
    expect(res.body.error).toBe("Token não fornecido");
  });

  it("deve bloquear acesso à rota GET /api/users/:id sem token", async () => {
    const res = await request(app).get(`${baseUrl}/1`);
    expect(res.status).toBe(401);
    expect(res.body.error).toBe("Token não fornecido");
  });

  it("deve bloquear acesso à rota PUT /api/users/:id sem token", async () => {
    const res = await request(app)
      .put(`${baseUrl}/1`)
      .send({ name: "Novo Nome" });
    expect(res.status).toBe(401);
    expect(res.body.error).toBe("Token não fornecido");
  });

  it("deve bloquear acesso à rota DELETE /api/users/:id sem token", async () => {
    const res = await request(app).delete(`${baseUrl}/1`);
    expect(res.status).toBe(401);
    expect(res.body.error).toBe("Token não fornecido");
  });

  it("deve permitir criação de usuário sem token (POST /api/users)", async () => {
    const res = await request(app).post("/api/users").send({
      name: "João",
      email: "joao@email.com",
      password: "123456",
      CPF: "97020624030",
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("user");
  });
});
