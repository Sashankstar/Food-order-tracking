import request from "supertest";
import app from "../Server.js";

describe("Order API", () => {
  it("should create a new order", async () => {
    const response = await request(app)
      .post("/api/orders")
      .send({
        items: [
          {
            item_id: "pasta-1",
            name: "Creamy Alfredo Pasta",
            price: 11.99,
            quantity: 1,
          },
        ],
        delivery_details: {
          name: "Test User",
          address: "Test Address",
          phone: "1234567890",
        },
        total: 14.98,
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.status).toBe("Order Received");
  });
});
