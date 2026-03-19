import app from "../../../main/app.js";
import request from "supertest";

let testUser;

describe("Auth API", () => {
  beforeAll(async () => {
    testUser = {
      email: `test${Date.now()}@mail.com`,
      password: "123456",
      userName: "shiva",
    };

    await request(app).post("/auth/register").send(testUser);
  });

  // -------- REGISTER --------
  describe("POST /auth/register", () => {
    test("should register user with valid body", async () => {
      const res = await request(app)
        .post("/auth/register")
        .send({
          email: `test${Date.now()}@mail.com`,
          password: "123456",
          userName: "shiva",
        });

      expect(res.statusCode).toBe(201);
      expect(res.body).toBeDefined();
    });

    test("should fail if fields missing", async () => {
      const res = await request(app).post("/auth/register").send({
        email: "test@example.com",
      });

      expect(res.statusCode).toBe(400);
    });

    test("should fail if email is invalid", async () => {
      const res = await request(app).post("/auth/register").send({
        email: "shiva",
        password: "123456",
        userName: "shiva",
      });

      expect(res.statusCode).toBe(400);
    });

    test("should fail if password is invalid", async () => {
      const res = await request(app).post("/auth/register").send({
        email: "test@example.com",
        password: "123",
        userName: "shiva",
      });

      expect(res.statusCode).toBe(400);
    });
  });

  // -------- LOGIN --------
  describe("POST /auth/login", () => {
    test("should login user with valid body", async () => {
      const res = await request(app)
        .post("/auth/login")
        .send({
          email: testUser.email,
          password: testUser.password,
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toBeDefined();
    });

    test("should fail with wrong password", async () => {
      const res = await request(app)
        .post("/auth/login")
        .send({
          email: testUser.email,
          password: "wrongpassword",
        });

      expect(res.statusCode).toBe(401);
    });
  });
});