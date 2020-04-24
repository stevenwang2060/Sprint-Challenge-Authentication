const request = require("supertest");
const db = require("../database/dbConfig.js");
const User = require("./auth-model");
const server = require("../api/server.js");

beforeEach(async () => {
  await db("users").truncate();
});

describe("/register & /login", () => {
  // Test user database
  it("Test user registration", async () => {
    User.add({ username: "admin", password: "hello" });
    const users = await db("users");
    expect(users).toHaveLength(1);
  });

  // Register Test #1
  it("Test register status success", async () => {
    const newUser = { username: "admin", password: "hello" };
    const res = await request(server)
      .post("/api/auth/register")
      .send(newUser);
    expect(res.status).toBe(201);
  });

  // Register Test #2
  it("Test register header connection", async () => {
    const newUser = { username: "admin", password: "hello" };
    const res = await request(server)
      .post("/api/auth/register")
      .send(newUser);
    expect(res.headers.connection).toBe("close");
  });

  // Login Test #1
  it("Test incorrect login", async () => {
    const credential = { username: "admin", password: "hello" };
    const res = await request(server)
      .post("/api/auth/login")
      .send(credential);
    expect(res.status).toBe(401);
  });

  // Login Test #2
  it("Test login header connection", async () => {
    const newUser = { username: "admin", password: "hello" };
    const res = await request(server)
      .post("/api/auth/register")
      .send(newUser);
    expect(res.headers.connection).toBe("close");
  });
});