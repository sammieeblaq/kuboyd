const request = require("supertest");
const app = require("../app/app");
const db = require("../config/db");

describe("Account Endpoints", () => {
  beforeEach(() => {
    db.connect_test();
  });

  test("post an account", async (done) => {
    const response = await request(app).post("/accounts").send({
      id: 1,
      phone: "23222344543",
      email: "sairehrour@gmail.com",
      accountName: "Samuel",
      type: "savings",
      bvn: "223223344432334",
    });
    expect(response.statusCode).toBe(200);
    expect(typeof response.body).toBe("object");
    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("accountName");
    expect(response.body).toHaveProperty("balance");
    expect(response.body).toHaveProperty("accountNumber");
    done();
  });

  const accNumber = 227675259;

  test("Get accounts by id", async (done, accNumber) => {
    const response = await request(app).get(`/accounts?accNumber=${accNumber}`);
    expect(response.body).toBe(200);
  });

  afterEach((done) => {
    db.disconnect(done);
  });
});
