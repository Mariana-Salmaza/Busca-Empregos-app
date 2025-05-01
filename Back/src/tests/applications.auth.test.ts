import request from "supertest";
import app from "../app";

const baseUrl = "/applications";

describe("Proteção por autenticação nas rotas de candidaturas", () => {
  it("deve bloquear acesso à rota GET /applications sem token", async () => {
    const res = await request(app).get(baseUrl);
    expect(res.status).toBe(401);
    expect(res.body.error).toBe("Token não fornecido");
  });

  it("deve bloquear acesso à rota GET /applications/:id sem token", async () => {
    const res = await request(app).get(`${baseUrl}/1`);
    expect(res.status).toBe(401);
    expect(res.body.error).toBe("Token não fornecido");
  });

  it("deve bloquear acesso à rota POST /applications sem token", async () => {
    const res = await request(app).post(baseUrl).send({
      vacancyId: 1,
      userId: 1,
      resume: "curriculo.pdf",
    });
    expect(res.status).toBe(401);
    expect(res.body.error).toBe("Token não fornecido");
  });

  it("deve bloquear acesso à rota PUT /applications/:id sem token", async () => {
    const res = await request(app).put(`${baseUrl}/1`).send({
      resume: "atualizado.pdf",
    });
    expect(res.status).toBe(401);
    expect(res.body.error).toBe("Token não fornecido");
  });

  it("deve bloquear acesso à rota DELETE /applications/:id sem token", async () => {
    const res = await request(app).delete(`${baseUrl}/1`);
    expect(res.status).toBe(401);
    expect(res.body.error).toBe("Token não fornecido");
  });
});
