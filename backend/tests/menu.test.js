import request from "supertest";
import app from "../Server.js";

describe("Menu API Tests", () => {

  it("GET /api/menu - should return menu list", async () => {
    const res = await request(app).get("/api/menu");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

});
