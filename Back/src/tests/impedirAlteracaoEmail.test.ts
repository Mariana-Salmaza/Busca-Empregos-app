import request from "supertest";
import app from "../app";
import UserModel from "../model/UserModel";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";
import { console } from "inspector";

describe("Restrição de alteração de e-mail", () => {
  let user: any;
  let token: string;

  beforeAll(async () => {
    await UserModel.destroy({ where: { email: "naoalterar@email.com" } });

    user = await UserModel.create({
      name: "Usuário Teste",
      email: "naoalterar@email.com",
      password: await bcrypt.hash("123456", 10),
      CPF: "12345678909",
    });

    token = generateToken(user);
  });

  afterAll(async () => {
    await UserModel.destroy({ where: { email: "naoalterar@email.com" } });
  });

  it("não deve permitir que o usuário altere seu e-mail", async () => {
    const res = await request(app)
      .put(`/users/${user.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ email: "novoemail@email.com" });

    expect(res.status).toBe(400);
    console.log(res.body);
    expect(res.body.error).toBe("Alteração de e-mail não é permitida");
  });
});
