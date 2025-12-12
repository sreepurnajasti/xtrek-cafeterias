import request from "supertest";
import { createApp } from "../src/server.js";

const app = createApp();

describe("xtrek cafeterias API", () => {
  it("returns a menu array from GET /api/menu", async () => {
    const res = await request(app).get("/api/menu");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("rejects invalid menu payload on PUT /api/menu", async () => {
    const res = await request(app)
      .put("/api/menu")
      .send({ not: "an array" });
    expect(res.status).toBe(400);
  });

  it("rejects invalid cafeteria_id on POST /api/prices/catering", async () => {
    const res = await request(app)
      .post("/api/prices/catering")
      .send({ cafeteria_id: "invalid" });
    expect(res.status).toBe(400);
  });
});
