const request = require("supertest");
const app = require("../app/app");
const db = require("../config/db");

beforeAll(() => {
  db.connect_test();
});

describe("Enpoint for posting an account", () => {
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
});

describe("Endpoint for getting an account by account number", () => {
  test("get account by account number", async (done) => {
    const response = await request(app).get(`/account?accNumber=${9074840226}`);
    expect(response.statusCode).toBe(200);
    expect(typeof response.body).toBe("object");
    expect(response.body).toHaveProperty("uuid");
    expect(response.body).toHaveProperty("accountName");
    expect(response.body).toHaveProperty("accountNumber");
    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("accountBalance");
    done();
  });
});

afterAll((done) => {
  db.disconnect(done);
});
