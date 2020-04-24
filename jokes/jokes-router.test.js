const request = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig.js");

beforeEach(async () => {
    await db("users").truncate();
  });

describe("jokes router", function() {
  it("should display a list of dad jokes", function() {
    expect(true).toBe(true);
  });

    it("Test jokes type", async () => {
      const res = await request(server).get("/api/jokes/");
      expect(res.type).toMatch(/json/i);;
    });
  
    it("Test GET jokes status", async () => {
      const res = await request(server).get("/api/jokes/");
      expect(res.status).toBe(400);
    });
});