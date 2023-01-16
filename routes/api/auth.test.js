const mongoose = require("mongoose");
const request = require("supertest");
require("dotenv").config();

const app = require("../../app");
const { User } = require("../../models/user");

const { DB_HOST } = process.env;

describe("test auth router", () => {
  let server;
  beforeAll(() => (server = app.listen(3000)));
  afterAll(() => server.close());

  beforeEach((done) => {
    mongoose.connect(DB_HOST).then(() => done());
  });

  afterEach((done) => {
    mongoose.connection.db.dropCollection(() => {
      mongoose.connection.close(() => done());
    });
  });

  test("test login route", async () => {
    const newUser = {
      email: "gravatar@gmail.com",
      password: "gravatar",
    };

    const user = await User.create(newUser);

    const loginUser = {
      email: "gravatar@gmail.com",
      password: "gravatar",
    };

    const response = await request(app)
      .post("/api/users/login")
      .send(loginUser);
    expect(response.statusCode).toBe(200);
    const { body } = response;
    expect(body.token).toByTruthy();
    const { token } = await User.findById(user._id);
    expect(body.token).toBe(token);
  });
});
