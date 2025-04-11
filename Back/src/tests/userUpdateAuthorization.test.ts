import request from "supertest";
import app from "../app";
import UserModel from "../model/UserModel";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";

beforeEach(async () => {
  await UserModel.destroy({ where: {} });
});

afterEach(async () => {
  await UserModel.destroy({ where: {} });
});

describe("Restrição de edição de usuários", () => {
  it("deve permitir que o próprio usuário edite seus dados", async () => {
    const user = await UserModel.create({
      name: "Usuário Original",
      email: "user1@example.com",
      password: await bcrypt.hash("senha123", 10),
      CPF: "12345678909",
    });

    const token = generateToken(user);

    const res = await request(app)
      .put(`/api/users/${user.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Nome Atualizado" });

    expect(res.status).toBe(200);
    expect(res.body.user.name).toBe("Nome Atualizado");
  });

  it("deve impedir que um usuário edite os dados de outro", async () => {
    const user1 = await UserModel.create({
      name: "Usuário 1",
      email: "user1@example.com",
      password: await bcrypt.hash("senha123", 10),
      CPF: "12345678901",
    });

    const user2 = await UserModel.create({
      name: "Usuário 2",
      email: "user2@example.com",
      password: await bcrypt.hash("senha123", 10),
      CPF: "12345678902",
    });

    const token = generateToken(user1);

    const res = await request(app)
      .put(`/api/users/${user2.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Hackeado" });

    expect(res.status).toBe(403);
    expect(res.body.error).toBe("Você só pode atualizar a sua própria conta");
  });
});
