import request from "supertest";
import app from "../app";

const baseUrl = "/api/applications";

describe("Proteção por autenticação nas rotas de candidaturas", () => {
  it("deve bloquear acesso à rota GET /api/applications sem token", async () => {
    const res = await request(app).get(baseUrl);
    expect(res.status).toBe(401);
    expect(res.body.error).toBe("Token não fornecido");
  });

  it("deve bloquear acesso à rota GET /api/applications/:id sem token", async () => {
    const res = await request(app).get(`${baseUrl}/1`);
    expect(res.status).toBe(401);
    expect(res.body.error).toBe("Token não fornecido");
  });

  it("deve bloquear acesso à rota POST /api/applications sem token", async () => {
    const res = await request(app).post(baseUrl).send({
      vacancyId: 1,
      userId: 1,
      resume: "curriculo.pdf",
    });
    expect(res.status).toBe(401);
    expect(res.body.error).toBe("Token não fornecido");
  });

  it("deve bloquear acesso à rota PUT /api/applications/:id sem token", async () => {
    const res = await request(app).put(`${baseUrl}/1`).send({
      resume: "atualizado.pdf",
    });
    expect(res.status).toBe(401);
    expect(res.body.error).toBe("Token não fornecido");
  });

  it("deve bloquear acesso à rota DELETE /api/applications/:id sem token", async () => {
    const res = await request(app).delete(`${baseUrl}/1`);
    expect(res.status).toBe(401);
    expect(res.body.error).toBe("Token não fornecido");
  });
});
